
komunikacja z innymi mikrofrontami, moze odbywać się za pomocą webpack module federation

mikrofronty inne, nie muszą obsługiwać SSR. Wystarczy ze będa działały tylko w trybie dev-servera webpackowego





czy da się zrobic tak, aby wykorzystac mechanizm suspense, do oczekiwania na dane
Wtedy nie trzeba bedzie sie bawic z odtwarzaniem stanu.
Po stronie kliena te requesty wykonane zostałyby ponownie i zawartość strony uległaby hydracji.


funkcjaPobierajaceDane() -> T | null


if (null) {
    throw Error('') <---- ten który jest normalnie rzucany przez mechanizm Suspense ????
}

to powinno potencjalnie spowodować zadziałanie tego mechanizmu suspense




