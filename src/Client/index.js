import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Cookies from 'universal-cookie';
import { getBaseUrl } from 'Helpers';
import possibleTypes from './possibleTypes';

// eslint-disable-next-line
import { Auth } from './Auth';

const cookies = new Cookies();

const httpLink = new HttpLink({
    uri: `${getBaseUrl()}/m/query`,
});

const streamHttpLink = new HttpLink({
    uri: `${getBaseUrl()}/s/query`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    if (document.cookie.indexOf('jwt') >= 0) {
        const token = cookies.get('jwt');

        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: token.jwt ? `Bearer ${token.jwt}` : '',
            },
        }));
    }

    return forward(operation);
});

const errorLink = onError(({ networkError }) => {
    if (networkError && networkError.statusCode === 401) {
        Auth.logout();
    }

    if (networkError && networkError.statusCode === 403) {
        Auth.logout();
    }
});


const cache = new InMemoryCache({
    possibleTypes,
    typePolicies: {
        Query: {
            fields: {
                movies: {
                    keyArgs: ["sort", "sortDirection", "uuid"],
                    merge(existing, incoming, params) {
                        const { offset } = params.variables;
                        const merged = existing ? existing.slice(0) : [];
                        // Insert the incoming elements in the right places, according to args.
                        const newEnd = offset + incoming.length;
                        const oldEnd = existing?.length ?? 0;
                        for (let i = Math.min(offset, oldEnd); i < newEnd; i += 1) {
                            if (i >= offset) {
                                merged[i] = incoming[i - offset];
                            } else if (i >= oldEnd) {
                                // add placeholder
                                merged[i] = null;
                            }
                        }
                        return merged;
                    },
                    read(existing) {
                        return existing ?? [];
                    }
                },
                series: {
                    keyArgs: ["sort", "sortDirection", "uuid"],
                    merge(existing, incoming, params) {
                        const { offset } = params.variables;
                        const merged = existing ? existing.slice(0) : [];
                        // Insert the incoming elements in the right places, according to args.
                        const newEnd = offset + incoming.length;
                        const oldEnd = existing?.length ?? 0;
                        for (let i = Math.min(offset, oldEnd); i < newEnd; i += 1) {
                            if (i >= offset) {
                                merged[i] = incoming[i - offset];
                            } else if (i >= oldEnd) {
                                // add placeholder
                                merged[i] = null;
                            }
                        }
                        return merged;
                    },
                    read(existing) {
                        return existing ?? [];
                    }
                }
            },
        },
    },    
    dataIdFromObject: (object) => object.uuid || null,
});

const client = new ApolloClient({
    cache,
    link: from([errorLink, authMiddleware, httpLink]),
});

export const streamingClient = new ApolloClient({
    cache,
    link: from([errorLink, authMiddleware, streamHttpLink])
});

export default client;
