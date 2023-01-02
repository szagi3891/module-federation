import { observer } from 'mobx-react-lite';
import React from 'react';
import { Resource } from './utils/Resource';
// import { timeout } from './utils/timeout';

//https://jsonplaceholder.typicode.com/posts

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

const list = new Resource(async () => {
    console.info('fetch 1 ...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    console.info('fetch 2 ...');
    const json: Array<Post> = await response.json();
    console.info('fetch 3 ...');
    return json;
});

export default observer(() => {
    const data = list.get();
    console.info('data 1111 --->');

    if (data.type === 'loading') {
        console.info('LOADING w komponencie');
        throw data.whenReady;
    }

    if (data.type === 'ready') {
        const result = [];

        for (const post of data.value) {
            result.push((
                <div key={post.id}>
                    { post.id } - { post.title }
                </div>
            ));
        }
        
        return (
            <div>
                { result }
            </div>
        );
    }

    return (
        <div>
            Error loading
        </div>
    );
});
