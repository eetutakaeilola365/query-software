# Quizzer-software by project team pepperpot
School project. In this project the end goal is to make a software where the user can answer questions.
## Team members
- Kosti Kangasmaa https://github.com/kostikangasmaa
- Edward Takaeilola https://github.com/eetutakaeilola365
- Hilja Katajamäki https://github.com/hilja04
- Vilho Karhu https://github.com/kvilho
- Ikechukwu Aniebonam https://github.com/ikeani

__Backlog link:__
https://github.com/users/eetutakaeilola365/projects/1/views/3

__Deployment link:__
https://pepperpot-quizzer.onrender.com/quizlist

__Developer guide:__

1. __System requirements:__
   - `Java version 17`

2. __Starting the Back End application:__
   - Clone the repository and in the repository run the command mvnw spring-boot:run
     
3. __Data model__

    Documentation:

      1. `Quiz` Entity edustaa kyselyä, joka sisältää joukon kysymksiä (Question) ja on liitettynä yhteen kategoriaan (Category). 
      
         __Kyselyllä on seuraavia attribuutteja:__
      
            - Quizid (long) - quiz-olion uniikki tunniste
            - Name (string) - Kyselyn nimi
            - Description (string) - Kokeen lyhyt kuvaus
            - Published (boolean) - Ilmoittaa, onko kysely julkaistu vai julkaisematon
            - Date (localdate) - Kyselyn luomis päivä

         __Suhteet:__
            - One to many ( Quiz -> Question)
            - Many to one  ( Quiz -> Category)

      2. `Question` Entity edustaa kysymystä, joka kuuluu kyselyyn (Quiz), ja johon sisältyy vastausvaihtoehtoja(Answer). 
         
         __Kysymyksellä on seuraavia attribuutteja:__

            - Questionid (long) - Kysymys-olion uniikki tunniste
            - Name (string) - Kysymyksen nimi
            - Difficulty (string) - Kysymyksen vaikeus taso

         __Suhteet :__
            - Many to one ( Question -> Quiz )  
            - One to many ( Question -> Answer )

      3. `Answer` Entity edustaa kysymyksen (Question) yhtä vastausvaihtoehtoa. Vastausvaihtoehto saa useita palautuksia (submission), kun vastausvaihtoehto on valittu.
      
         __Vastauksella on seuraavia attribuutteja:__
         
            - Answerid (long) - Vastaus-olion uniikki tunniste
            - Choice (string) - Vastausvaihtoehdon teksti
            - Correct (boolean) - Ilmoittaa onko vastaus oikein vai väärin. 

         __Suhteet:__
            - Many to one ( Answer -> Question )
            - One to many ( Answer -> Submission )
            
      4. `Category` Entity edustaa kategoriaa, johon kuuluu kyselyitä (Quiz). 

         __Kategorialla on seuraavia attribuutteja:__
            - Categoryid (long) - Kategoria-olion uniikki tunnus
            - Name (string) - Kategorian nimi 
            - Description (string) - Kategorian lyhyt kuvaus
        
         __Suhteet:__
            - One to many ( Category -> Quiz )
            - 
      5. `Submission` entity edustaa käyttäjän palautusta, jossa hän on valinnut vastausvaaihtoehdon(Answer) kysymykseen(Question). Palautus liittyy johonkin vastaukseen              (Answer)

         __Palautuksella on seuraava attribuutti:__
            - Submissionid (long) - palautus-olion uniikki tunniste

         __Suhteet__:
            - Many to one ( Submission -> Answer )


      Entity relationship diagram:
      
   ```mermaid
   
      erDiagram
         Quiz ||--o{ Question : ""
         Quiz {
            long quizid
            string name
            string descrition
            boolean published
            localDate date
         }
         Question ||--o{ Answer : ""
         Question{
            long questionid
            string name
            string difficulty
         }
         Answer ||--o{ Submission : ""
         Answer{
            long answerid
            string choice
            boolean correct
         }
         Category ||--o{ Quiz : ""
         Category{
            long categoryid
            string name
            string description
         }
         Submission{
            long submissionid
         }
   ```

  
