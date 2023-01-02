
//TODO - zaktualizować Resource w website
//TODO - Zrobić szkielet stora spinającego. Tego który będzie operował tylko na dynamicznych importach

```
//Kesz na promisa.

const Router 

const getCasino = async () => {
    const Store = await import('mikro/domena1/Store');

    const store = new Store({
        jakasAkcja: async (betId: number) => {
            const sportsbook = await getDomena2();
            sportsbook.jakasAkcja('betId')
        },
        // getCurrentCasinoBalance => number
    });

    return store;
}

const getDomena2 = async () => {
    const Store = await import('mikro/domena2/Store');

    const store = new Store({

    });

    return store;
}
```

komunikacja z innymi mikrofrontami, moze odbywać się za pomocą webpack module federation

mikrofronty inne, nie muszą obsługiwać SSR. Wystarczy ze będa działały tylko w trybie dev-servera webpackowego


-----


czy da się zrobic tak, aby wykorzystac mechanizm suspense, do oczekiwania na dane
Wtedy nie trzeba bedzie sie bawic z odtwarzaniem stanu.
Po stronie kliena te requesty wykonane zostałyby ponownie i zawartość strony uległaby hydracji.


```
funkcjaPobierajaceDane() -> T | null

if (null) {
    throw Error('')
    // ten który jest normalnie rzucany
    // przez mechanizm Suspense ????
}
```

to powinno potencjalnie spowodować zadziałanie tego mechanizmu suspense



------


spróbować zrobić Resource w storze globalnym
w komponencie, spróbowac zrobic ifa na warunek ładowania

```
if (ładowanie) {
    return <KomponentLoading />
}
```

------

//czyli wiecznie ładujący się komponenty
const KomponentLoading = React.lazy(() => new Promise(() => {}));

Próba wyrenderowania tego komponentu powinna spowodować wyrzucenie wyjątku o niegotowości do mechanizmu suspense


------


```
import { Suspense, useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // pobierz dane z sieci
      const response = await fetch('/my-data');
      const json = await response.json();

      // ustaw dane w stanie komponentu
      setData(json);
    }
    fetchData();
  }, []);

  if (!data) {
    throw new Promise(() => {});
  }

  return <div>{data.message}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

--------

```
https://reactjs.org/docs/code-splitting.html#reactlazy
https://reactjs.org/docs/react-dom-server.html#rendertopipeablestream
```


Nodejs który natywnie wspiera fetch
```
https://blog.logrocket.com/fetch-api-node-js/
```

