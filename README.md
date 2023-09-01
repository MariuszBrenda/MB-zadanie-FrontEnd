# Aplikacja Twój Budżet

## Wykorzystane biblioteki i mechanizmy
Projekt wykorzystuje framework React oraz biblioteki:
- do zarządzania globalnym stanem aplikacji: reduxjs/toolkit
- UI - primereact
- zewnętrzne API - currencybeacon - wymiana walut i dane archiwalne o kursach

Do zapamiętywania danych wykorzystano localStorage przeglądarki.

## Przeznaczenie aplikacji
Aplikacja służy do zarządzania domowym budżetem.
Umożliwia dodawanie wydatków i przychodów, a następnie wgląd w archiwalne dane.

## Zapamiętywane dane
- baza danych użytkowników
- baza transakcji

## Globalny stan aplikacji
- zalogowany użytkownik
- baza danych użytkowników
- baza danych transakcji

### Strona Główna
Wykresy:
- bilans miesiąca
- rozbiciem kosztów
- rozbiciem dochodów
- tabela z podsumowaniem miesiąca - możliwość usuwania błędnych rekordów

Wybrany do podglądu miesiąc może zostać zmieniony przy pomocy strzałek na stronie głównej.

### Strona - Dodaj transakcję
Nowe transakcje dodajemy w zakładce "Dodaj transakcję". Do transakcji można wpisać podstawowe dane, a następne należy wcisnąć "Dodaj".

### Kantor Online
Zewnętrzne API. Umożliwia wybór z puli wybranych walut tych, które mają być przeliczane.
Zaimplementowano również wykres przedstawiający kurs wybranych walut względem siebie z ostatnich 30 dni.
