import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pathlib import Path
from django.http import HttpResponse
import json

# --------------------------
# MOCK LLM (safe for demo)
# --------------------------
def ask_gemini(prompt):
    return "Here is the analysis based on your data. Prices show a steady trend, demand is moderate, and the locality shows consistent growth."


# --------------------------
# Load Dataset
# --------------------------
FILE_PATH = Path(__file__).resolve().parent.parent / "data" / "real_estate.xlsx"

df = pd.read_excel(FILE_PATH)
df.columns = df.columns.str.strip().str.lower()

df["final location"] = df["final location"].str.lower().str.strip()

ALLOWED_LOCALITIES = ["akurdi", "ambegaon budruk", "aundh", "wakad"]


# --------------------------
# MAIN API
# --------------------------
@api_view(["POST"])
def analyze_area(request):
    user_query = request.data.get("query", "").lower().strip()

    # Simple locality detection
    detected = []
    for loc in ALLOWED_LOCALITIES:
        if loc in user_query:
            detected.append(loc)

    if not detected:
        return Response({"error": "No valid locality detected."}, status=400)

    results = {}

    for loc in detected:
        filtered = df[df["final location"] == loc]
        if not filtered.empty:
            results[loc] = filtered

    if not results:
        return Response({"error": "Locality not found in dataset"}, status=404)

    # --------------------------
    # CLEAN DATA + Chart data
    # --------------------------
    chart = {}
    clean_tables = {}

    for loc, data in results.items():

        # Replace NaN or inf values for safe JSON
        clean = data.replace([float("inf"), -float("inf")], None).fillna(0)

        # Save cleaned table
        clean_tables[loc] = clean.to_dict(orient="records")

        # Create chart
        chart[loc] = {
            "years": clean["year"].tolist(),
            "prices": clean["flat - weighted average rate"].tolist(),
            "demand": clean["total sold - igr"].tolist(),
        }

    # --------------------------
    # Summary (mock for demo)
    # --------------------------
    summary = ask_gemini("dummy prompt")

    # --------------------------
    # Return Response
    # --------------------------
    return Response({
        "summary": summary,
        "chart": chart,
        "table": clean_tables
    })


# --------------------------
# DOWNLOAD CSV
# --------------------------
@api_view(["GET"])
def download_dataset(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=real_estate_data.csv'
    df.to_csv(response, index=False)
    return response
