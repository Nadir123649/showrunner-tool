import { useState } from "react";

const useReplicate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Generating image with prompt:", prompt);

      // Get API key from environment variable
      const API_KEY = process.env.REACT_APP_REPLICATE_API_KEY;

      if (!API_KEY) {
        throw new Error(
          "Replicate API key not found. Please check your environment variables."
        );
      }

      // Using a CORS proxy
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "https://api.replicate.com/v1/predictions";

      const response = await fetch(proxyUrl + targetUrl, {
        method: "POST",
        headers: {
          Authorization: `Token ${API_KEY}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          version:
            "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
          input: {
            prompt: prompt,
            width: 512,
            height: 512,
            num_outputs: 1,
            num_inference_steps: 25,
          },
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        throw new Error(data.detail || `API error: ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Poll for result
      const imageUrl = await pollPrediction(data.id);

      setLoading(false);
      return imageUrl;
    } catch (err) {
      console.error("Image generation error:", err);
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const pollPrediction = async (predictionId) => {
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Get API key from environment variable
        const API_KEY = process.env.REACT_APP_REPLICATE_API_KEY;

        // Use CORS proxy for polling too
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(
          `${proxyUrl}https://api.replicate.com/v1/predictions/${predictionId}`,
          {
            headers: {
              Authorization: `Token ${API_KEY}`,
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );

        const prediction = await response.json();
        console.log("Polling status:", prediction.status);

        if (prediction.status === "succeeded") {
          return prediction.output[0];
        } else if (prediction.status === "failed") {
          throw new Error("Image generation failed on server");
        }

        attempts++;
      } catch (err) {
        console.error("Polling error:", err);
        throw err;
      }
    }

    throw new Error("Image generation timeout after 60 seconds");
  };

  return { generateImage, loading, error };
};

export default useReplicate;
