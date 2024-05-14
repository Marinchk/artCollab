Zadanie 6 – System zarządzania projektami grupowymi

Krótki opis

Współpraca (dalej collab) jest dziełem kilku artystów. Zadaniem serwisu jest zapewnienie wygodnego środowiska , w którym artyści mogą tworzyć collabs, zapraszać tam uczestników , edytować informacje i śledzić wynik. 
wszyscy użytkownicy są w autoryzowanym miejscu
--------------------------------------------------------
zaimplementowane funkcje

Każdy użytkownik może:
twórz kolaboracje
zobacz kolaboracje gdzie jest właścicielem lub uczestnikami
Jeśli jest twórcą kolaboracji :
Usuń współpracę
edytuj współpracę
Zobacz informacje o współpracy
Jeśli jest uczestnikiem kolaboracji:
Usuń się ze współpracy
Zobacz informacje o współpracy
--------------------------------------------------

jak uruchomić:
1) Wpisz npm init aby zainstalować wszystkie niezbędne rozszerzenia node.js
2) Utwórz plik .env jeśli skonfigurowałeś autoryzację dla mongoDB, musisz wprowadzić następujące dane 


IP_HOST = Twój adres ip

MONGO_USERNAME = nazwa administratora Mongo
MONGO_PASSWORD = hasło
MONGO_HOSTNAME = Twój adres ip
MONGO_PORT = 27017 
MONGO_DB = baza danych w Mango gdzie można zapisać swoje dane (artCollab)

jeśli nie skonfigurowałeś dostępu, nie musisz wpisywać tych wartości

Ponieważ projekt ma JWT, musisz wymyślić swoje tajne słowo, aby utworzyć token jwt

KEY = twoje tajne słowo 

określ także port, na którym chcesz uruchomić aplikację
PORT = twój port