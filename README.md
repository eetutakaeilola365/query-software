# Quizzer-software by project team pepperpot
School project. In this project the end goal is to make a software where the user can answer questions.
## Team members
- Kosti Kangasmaa https://github.com/kostikangasmaa
- Edward Takaeilola https://github.com/eetutakaeilola365
- Hilja Katajamäki https://github.com/hilja04
- Vilho Karhu https://github.com/kvilho
- Ikechukwu Aniebonam https://github.com/ikeani

Backlog link:
https://github.com/users/eetutakaeilola365/projects/1/views/3

Deployment link:
https://pepperpot-quizzer.onrender.com/quizlist

Developer guide:
1. System requirements:
   - `Java version 17`

2. Starting the Back End application:
   - Clone the repository and in the repository run the command mvnw spring-boot:run
3. Data model
   
   Entity relationship diagram:
   
```mermaid
   ---
   title: Quizzer relationships
   ---
   erDiagram
      Quiz ||--o{ Question : 
      Quiz {
         long quizid
         string name
         string descrition
         boolean published
         localDate date
      }
      Question ||--o{ Answer : 
      Question{
         long questionid
         string name
         string difficulty
      }
      Answer ||--o{ Submission : 
      Answer{
         long answerid
         string choice
         boolean correct
      }
      Category ||--o{ Quiz : 
      Category{
         long categoryid
         string name
         string description
      }
      Submission{
         long submissionid
      }
```
