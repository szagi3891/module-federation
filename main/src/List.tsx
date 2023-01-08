import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withConfig } from './Config';
import { Resource } from './utils/Resource';
// import { timeout } from './utils/timeout';

//https://jsonplaceholder.typicode.com/posts

const ListItem = withConfig(config => styled('div')`
    background-color: ${config.backgroundColor};  
`);

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

console.info('Buduję obiekt RESOURCE');

const list = new Resource(async () => {
    console.info('fetch 1 ...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    console.info('fetch 2 ...');
    // await timeout(5000);
    const json: Array<Post> = await response.json();
    console.info('fetch 3 ...');
    return json;
});

export default observer(() => {
    const data = list.get();

    if (data.type === 'loading') {
        throw data.whenReady;
    }

    if (data.type === 'ready') {
        const result = [];

        for (const post of data.value) {
            result.push((
                <ListItem key={post.id}>
                    { post.id } - { post.title }
                </ListItem>
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
