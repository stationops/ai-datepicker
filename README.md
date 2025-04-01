# AI Datepicker 🧠📅

A lightweight, AI-powered date picker that understands natural language like:

> “Next Friday” • “3 days from now” • “1st Monday of May” • “tomorrow” • “31st August 1990”

---

## 📦 Installation

```bash
npm install ai-datepicker
```

## 📣 Events

You can hook into key lifecycle moments of the date fetching process:

| Prop       | Description                                       |
|------------|---------------------------------------------------|
| `fetching` | Called right before the date fetch begins         |
| `selected` | Called with the parsed date when fetch succeeds   |
| `error`    | Called with an error object if parsing fails      |
| `done`     | Called after fetch completes (with or without error) |


## ⚙️ Options

You can pass optional props to influence how the AI interprets and returns dates:

| Prop      | Description                                               |
|-----------|-----------------------------------------------------------|
| `region`  | Geographic region or locale (e.g. `"US"`, `"UK"`, `"JP"`) |
| `format`  | Output date format string (e.g. `"YYYY-MM-DD"`)           |
| `hint`    | Extra context to guide the AI (e.g. `"wedding dates"`)    |


## 🔗 Links

- [Website: aidatepicker.com](https://aidatepicker.com)
- [NPM Package: ai-datepicker](https://www.npmjs.com/package/ai-datepicker)


