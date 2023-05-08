```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser creates a new note,<br>  adds it to the list of notes <br> and updates the list of notes on the html document
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 CREATED
    deactivate server
```