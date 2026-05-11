import os

from groq import Groq

from dotenv import load_dotenv

# =====================================================
# LOAD ENV
# =====================================================

load_dotenv()

# =====================================================
# API KEY
# =====================================================

api_key = os.getenv("GROQ_API_KEY")

print("GROQ API KEY:", api_key)

# =====================================================
# CLIENT
# =====================================================

client = Groq(
    api_key=api_key
)

# =====================================================
# ASK AI
# =====================================================

def ask_ai_about_data(

    question,

    df,

    history=[]

):

    try:

        # =================================================
        # SAMPLE DATA
        # =================================================

        sample_data = df.head(10).to_string()

        # =================================================
        # SYSTEM PROMPT
        # =================================================

        system_prompt = f"""

You are an intelligent AI Data Analyst assistant.

Rules:
- Be conversational and human-friendly.
- Answer naturally like ChatGPT.
- Remember previous conversation context.
- Give concise and accurate answers.
- Do NOT explain your internal process.
- Avoid phrases like:
  "Based on the dataset..."
  "To find..."
  "I assume..."
- Directly answer.
- If user greets, respond casually.
- If question is unrelated to dataset, still reply politely.
- Keep answers clean and professional.
- Give practical insights when possible.

Dataset Columns:
{list(df.columns)}

Dataset Shape:
{df.shape}

Dataset Sample:
{sample_data}

"""

        # =================================================
        # CHAT HISTORY
        # =================================================

        messages = [

            {
                "role": "system",

                "content": system_prompt
            }

        ]

        # =================================================
        # ADD PREVIOUS CHAT
        # =================================================

        for msg in history[-10:]:

            if msg["role"] == "user":

                role = "user"

            else:

                role = "assistant"

            messages.append({

                "role": role,

                "content": msg["text"]

            })

        # =================================================
        # CURRENT QUESTION
        # =================================================

        messages.append({

            "role": "user",

            "content": question

        })

        # =================================================
        # AI COMPLETION
        # =================================================

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=messages,

            temperature=0.3,

            max_tokens=300

        )

        # =================================================
        # ANSWER
        # =================================================

        answer = (

            completion
            .choices[0]
            .message
            .content

        )

        # =================================================
        # GENERATE FOLLOW-UP SUGGESTIONS
        # =================================================

        suggestion_prompt = f"""

Generate 3 smart follow-up dataset questions.

Current User Question:
{question}

AI Answer:
{answer}

Rules:
- Keep questions short.
- Human friendly.
- Dataset related.
- No numbering.
- One question per line.
- Do not repeat the same question.

"""

        suggestion_completion = (

            client.chat.completions.create(

                model="llama-3.3-70b-versatile",

                messages=[

                    {
                        "role": "user",

                        "content": suggestion_prompt
                    }

                ],

                temperature=0.5,

                max_tokens=100

            )

        )

        suggestions_text = (

            suggestion_completion
            .choices[0]
            .message
            .content

        )

        # =================================================
        # CLEAN SUGGESTIONS
        # =================================================

        suggestions = [

            line.strip("- ").strip()

            for line in suggestions_text.split("\n")

            if line.strip()

        ]

        # =================================================
        # FINAL RESPONSE
        # =================================================

        return {

            "answer": answer,

            "suggestions": suggestions[:3]

        }

    except Exception as e:

        print("GROQ ERROR:", e)

        return {

            "answer":
            f"AI Error: {str(e)}",

            "suggestions": []

        }