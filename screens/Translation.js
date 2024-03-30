import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTranslation = (text, inlan, outlan) => {
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translateText = async () => {
      try {
        if(outlan=='en') setTranslatedText(text)
        else{
            const response = await axios.get(`https://f447-2405-201-e027-d80f-65d0-eb36-9ae9-842.ngrok-free.app/translate`, {
            params: {
                inlan: inlan,
                outlan: outlan,
                text: text,
            }
            });
            // console.log(response)
            setTranslatedText(response.data.output[0].target);
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    if (text) {
      translateText();
    }
  }, [text, inlan, outlan]);

  return translatedText;
};