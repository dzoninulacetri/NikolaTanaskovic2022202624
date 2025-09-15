# ToDo Application - Spring Boot REST API

Jednostavna Spring Boot REST aplikacija za upravljanje ToDo zadacima. Aplikacija omogućava CRUD operacije (Create, Read, Update, Delete) nad entitetom Task.

## Entitet Task

Task entitet sadrži sledeća polja:
- **id** (Long) - Jedinstveni identifikator (auto-generated)
- **name** (String) - Naziv zadatka (obavezno)
- **description** (String) - Opis zadatka (opciono)
- **done** (Boolean) - Status da li je zadatak završen (default: false)

## Tehnologije

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (in-memory)
- **Maven**

## Pokretanje aplikacije

### Preduslovi
- Java 17 ili novija verzija
- Maven 3.6 ili novija verzija

### Koraci za pokretanje

1. Kloniraj repository:
```bash
git clone <repository-url>
cd NikolaTanaskovic2022202624
```

2. Kompajliraj aplikaciju:
```bash
mvn clean compile
```

3. Pokreni aplikaciju:
```bash
mvn spring-boot:run
```

Aplikacija će biti pokrenuta na `http://localhost:8080`

### H2 Database Console

H2 konzola je dostupna za testiranje baze podataka:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: (ostaviti prazno)

## REST API Endpoints

Svi endpoint-ovi su dostupni na base URL-u: `http://localhost:8080/api/tasks`

### 1. Dobijanje svih zadataka
```
GET /api/tasks
```
**Response:** Lista svih zadataka u JSON formatu

### 2. Dobijanje zadatka po ID-u
```
GET /api/tasks/{id}
```
**Response:** Zadatak sa određenim ID-om ili 404 ako ne postoji

### 3. Kreiranje novog zadatka
```
POST /api/tasks
Content-Type: application/json

{
    "name": "Naziv zadatka",
    "description": "Opis zadatka",
    "done": false
}
```
**Response:** Kreiran zadatak sa dodeljenim ID-om

### 4. Ažuriranje postojećeg zadatka
```
PUT /api/tasks/{id}
Content-Type: application/json

{
    "name": "Ažurirani naziv",
    "description": "Ažurirani opis",
    "done": true
}
```
**Response:** Ažurirani zadatak ili 404 ako ne postoji

### 5. Brisanje zadatka
```
DELETE /api/tasks/{id}
```
**Response:** 200 OK ako je uspešno obrisano ili 404 ako ne postoji

## Primeri korišćenja (cURL)

### Kreiranje zadatka
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"name":"Kupiti mleko","description":"Kupiti mleko u prodavnici","done":false}'
```

### Dobijanje svih zadataka
```bash
curl -X GET http://localhost:8080/api/tasks
```

### Ažuriranje zadatka
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Kupiti mleko","description":"Zadatak je završen","done":true}'
```

### Brisanje zadatka
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

## Testiranje

Za testiranje API-ja možete koristiti:
- **Postman** - import Postman kolekciju iz fajla `ToDo_API_Collection.json`
- **cURL** - koristite primere iznad
- **H2 Console** - za direktno testiranje baze podataka

## Struktura projekta

```
src/
├── main/
│   ├── java/com/example/todoapp/
│   │   ├── TodoAppApplication.java      # Main aplikacija
│   │   ├── controller/
│   │   │   └── TaskController.java      # REST kontroler
│   │   ├── entity/
│   │   │   └── Task.java               # JPA entitet
│   │   ├── repository/
│   │   │   └── TaskRepository.java     # Data repository
│   │   └── service/
│   │       └── TaskService.java        # Business logika
│   └── resources/
│       └── application.properties      # Konfiguracija
```

## Napomene

- Baza podataka je **in-memory H2**, što znači da se podaci gube kada se aplikacija restartuje
- Aplikacija automatski kreira tabelu `tasks` pri pokretanju
- CORS je omogućen za sve origin-e za lakše testiranje frontend aplikacija
- Aplikacija koristi standardne Spring Boot konvencije