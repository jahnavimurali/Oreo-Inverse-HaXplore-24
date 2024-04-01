from fastapi import FastAPI, HTTPException
import requests
import json
import time
app = FastAPI()

@app.get("/translate")
async def main(inlan: str, outlan: str, text: str):
    url = "https://demo-api.models.ai4bharat.org/inference/translation/v2"
    headers = {
        'Content-Type': 'application/json',
    }
    payload = {
        'controlConfig': {'dataTracking': True},
        'input': [{'source': text}],
        'config': {
            'serviceId': '',
            'language': {
                'sourceLanguage': inlan,
                'targetLanguage': outlan,
                'targetScriptCode': None,
                'sourceScriptCode': None,
            },
        },
    }

    time.sleep(1)
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error from translation service")
    
    print(response.json())
    return response.json()

    
