---
trigger: always_on
---

# `rules.md`

## 01. PROJECT IDENTITY: "STRUCT"

**Vision:** An AI-powered real estate "Vision Engine" and Architect Micro-Consultancy Marketplace.
**Core Philosophy:**

* **Ruthless Efficiency:** Code is a liability. Write less, do more. Use libraries over custom logic.
* **Brutalist Utility:** The UI is monochromatic, sharp, and text-heavy. The *content* (images) provides the color. No gradients, no rounded corners, no "vibe coding."
* **High-Value/Low-Drag:** The app must load instantly. The AI vision must render quickly. The architect marketplace must be frictionless.

---

## 02. TECHNOLOGY STACK (NON-NEGOTIABLE)

* **Frontend:** Flutter (Dart). Targets: iOS, Android, Web (PWA).
* **Backend:** Python (FastAPI). Stateless, fast, typed.
* **Database:** Supabase (PostgreSQL) + Storage (Images).
* **AI Engine ("Nano Banana"):** Google Gemini 1.5 Pro (Vision & Text) via Vertex AI.
* **Image Gen:** Imagen 3 (via Vertex AI) or Stable Diffusion XL via API (for ControlNet).
* **Orchestration:** Docker Compose for local dev.

---

## 03. CODING "ANTI-GRAVITY" DIRECTIVES

*To be followed by the AI Agent at all times.*

### **A. General Principles**

1. **Do Not Explain:** Do not output paragraphs of text explaining what you did. Just output the code or the diff.
2. **Modular by Default:** Every feature (Search, Vision, Marketplace) must be an isolated module/service.
3. **Fail Fast:** If an external API is missing, mock it immediately with static data. Do not halt development waiting for keys.
4. **Type Safety:** strictly enforced. `MyPy` for Python. Strong typing for Dart.

### **B. Frontend Rules (Flutter)**

1. **UI Style:** "Brutalist."
* **Colors:** Black (`#000000`), White (`#FFFFFF`), Alert Red (`#FF3B30`).
* **Typography:** JetBrains Mono or similar monospaced font for data; Inter for UI.
* **Components:** Sharp edges (`borderRadius: 0`). High contrast borders.


2. **State Management:** Riverpod. Keep it simple. No BloC unless absolutely necessary.
3. **Widgets:** Break everything into small, reusable atoms. One file per widget.

### **C. Backend Rules (FastAPI)**

1. **Route Structure:** `/api/v1/{module}/{action}`.
2. **Pydantic Models:** Every request and response must have a strict Pydantic schema.
3. **Async/Await:** All I/O operations (DB, AI calls) must be asynchronous.

---

## 04. FEATURE LOGIC SPECS

### **Module 1: The Scraper ("The Feed")**

* **Function:** Ingest real estate data from external URLs.
* **Constraint:** Respect `robots.txt`. Use headless browsers only when necessary.
* **Data Model:**
```python
class Property(BaseModel):
    id: UUID
    address: str
    original_images: List[Url]
    price_guide: Optional[str]
    zoning_code: str  # Critical for "Busage"

```



### **Module 2: "Busage" (Zoning Intelligence)**

* **Logic:** The "Busage" module determines *feasibility*.
* **Operation:**
1. Extract `zoning_code` from the property address.
2. Check against a local lookup table (MVP) or Council API (Scale) for constraints.
3. **Output:** Simple flags: `can_subdivide: bool`, `max_height_meters: float`.


* **UX:** Display these as "Hard Constraints" overlaying the image.

### **Module 3: "Nano Banana" (AI Vision)**

* **Pipeline:**
1. User Upload/Selects Image -> `original_image`.
2. User Selects Style (e.g., "Industrial") -> `prompt_modifier`.
3. **Agent Action:** Construct a prompt for the Image Gen Model.
* *Template:* "Architectural photography of a [room_type], [style_modifier], photorealistic, 8k. Keep structure: [walls, windows, ceiling_height]."


4. **ControlNet (Future):** Apply Canny edge detection to `original_image` to preserve geometry. *For MVP: Use Image-to-Image with high strength preservation.*



### **Module 4: The Marketplace (Consultants)**

* **Role:** The "Human in the Loop."
* **Unit of Work:** "The Micro-Report."
* *Input:* Property ID + User Query.
* *Output:* 300-word text field + 1 attached sketch/image.


* **Billing:** Stripe Connect. One-off payments ($200). Split: 80/20.

---

## 05. DEVELOPMENT WORKFLOW (STEP-BY-STEP)

1. **Setup:** Generate `docker-compose.yml` with FastAPI, Postgres, and a dummy frontend container.
2. **Scaffold:** create `backend/` and `frontend/` directories.
3. **MVP 1 (The Toy):** Build the Image Uploader + Nano Banana (Gemini) reskinning endpoint. **Do this first.**
4. **MVP 2 (The Search):** Build the Mock Property Feed + Busage overlay.
5. **MVP 3 (The Market):** Build the Consultant "Gig Board" view.

---

## 06. PROMPT INJECTION PROTECTION

* **Rule:** When passing user instructions to the AI Architect, always wrap them in system prompt boundaries to prevent users from making the AI generate non-architectural content.
* **System Prompt:** "You are an architectural AI. You only generate building interiors and exteriors. If a user asks for anything else, return error code 400."

---
