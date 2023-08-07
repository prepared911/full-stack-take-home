import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Chatroom = {
  __typename?: 'Chatroom';
  callerPhoneNumber: Scalars['String']['output'];
  chatroomNotes?: Maybe<Array<ChatroomNote>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  natureCode?: Maybe<NatureCode>;
  resolved: Scalars['Boolean']['output'];
};

export type ChatroomNote = {
  __typename?: 'ChatroomNote';
  chatroomId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of CreateChatroom */
export type CreateChatroomInput = {
  callerPhoneNumber: Scalars['String']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  natureCodeId?: InputMaybe<Scalars['ID']['input']>;
};

/** Autogenerated input type of CreateChatroomNote */
export type CreateChatroomNoteInput = {
  chatroomId: Scalars['ID']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of CreateChatroomNote. */
export type CreateChatroomNotePayload = {
  __typename?: 'CreateChatroomNotePayload';
  chatroomNote: ChatroomNote;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated return type of CreateChatroom. */
export type CreateChatroomPayload = {
  __typename?: 'CreateChatroomPayload';
  chatroom: Chatroom;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of DeleteChatroomNote */
export type DeleteChatroomNoteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of DeleteChatroomNote. */
export type DeleteChatroomNotePayload = {
  __typename?: 'DeleteChatroomNotePayload';
  chatroomNote: ChatroomNote;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of EditChatroom */
export type EditChatroomInput = {
  chatroomId: Scalars['ID']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Autogenerated return type of EditChatroom. */
export type EditChatroomPayload = {
  __typename?: 'EditChatroomPayload';
  chatroom: Chatroom;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatroom?: Maybe<CreateChatroomPayload>;
  createChatroomNote?: Maybe<CreateChatroomNotePayload>;
  deleteChatroomNote?: Maybe<DeleteChatroomNotePayload>;
  editChatroom?: Maybe<EditChatroomPayload>;
};


export type MutationCreateChatroomArgs = {
  input: CreateChatroomInput;
};


export type MutationCreateChatroomNoteArgs = {
  input: CreateChatroomNoteInput;
};


export type MutationDeleteChatroomNoteArgs = {
  input: DeleteChatroomNoteInput;
};


export type MutationEditChatroomArgs = {
  input: EditChatroomInput;
};

export type NatureCode = {
  __typename?: 'NatureCode';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  chatroomNotes: Array<ChatroomNote>;
  chatrooms: Array<Chatroom>;
  natureCodes: Array<NatureCode>;
};


export type QueryChatroomNotesArgs = {
  chatroomId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryChatroomsArgs = {
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChatroomDataFragment = { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomNotes?: Array<{ __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string }> | null };

export type ChatroomNoteDataFragment = { __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string };

export type NatureCodeDataFragment = { __typename?: 'NatureCode', id: string, name: string };

export type CreateChatroomMutationVariables = Exact<{
  label: Scalars['String']['input'];
  callerPhoneNumber: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  natureCodeId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateChatroomMutation = { __typename?: 'Mutation', createChatroom?: { __typename?: 'CreateChatroomPayload', chatroom: { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomNotes?: Array<{ __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string }> | null } } | null };

export type CreateChatroomNoteMutationVariables = Exact<{
  note?: InputMaybe<Scalars['String']['input']>;
  chatroomId: Scalars['ID']['input'];
}>;


export type CreateChatroomNoteMutation = { __typename?: 'Mutation', createChatroomNote?: { __typename?: 'CreateChatroomNotePayload', chatroomNote: { __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string } } | null };

export type EditChatroomMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
  chatroomId: Scalars['ID']['input'];
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type EditChatroomMutation = { __typename?: 'Mutation', editChatroom?: { __typename?: 'EditChatroomPayload', chatroom: { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomNotes?: Array<{ __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string }> | null } } | null };

export type ArchivedChatroomsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ArchivedChatroomsListQuery = { __typename?: 'Query', chatrooms: Array<{ __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomNotes?: Array<{ __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string }> | null }> };

export type ChatroomNotesListQueryVariables = Exact<{
  chatroomId: Scalars['ID']['input'];
}>;


export type ChatroomNotesListQuery = { __typename?: 'Query', chatroomNotes: Array<{ __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string }> };

export type ChatroomsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatroomsListQuery = { __typename?: 'Query', chatrooms: Array<{ __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomNotes?: Array<{ __typename?: 'ChatroomNote', id: string, note?: string | null, chatroomId?: string | null, createdAt: string }> | null }> };

export type NatureCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type NatureCodesQuery = { __typename?: 'Query', natureCodes: Array<{ __typename?: 'NatureCode', id: string, name: string }> };

export const NatureCodeDataFragmentDoc = gql`
    fragment NatureCodeData on NatureCode {
  id
  name
}
    `;
export const ChatroomNoteDataFragmentDoc = gql`
    fragment ChatroomNoteData on ChatroomNote {
  id
  note
  chatroomId
  createdAt
}
    `;
export const ChatroomDataFragmentDoc = gql`
    fragment ChatroomData on Chatroom {
  id
  label
  description
  callerPhoneNumber
  resolved
  natureCode {
    ...NatureCodeData
  }
  chatroomNotes {
    ...ChatroomNoteData
  }
}
    ${NatureCodeDataFragmentDoc}
${ChatroomNoteDataFragmentDoc}`;
export const CreateChatroomDocument = gql`
    mutation CreateChatroom($label: String!, $callerPhoneNumber: String!, $description: String, $natureCodeId: ID) {
  createChatroom(
    input: {label: $label, callerPhoneNumber: $callerPhoneNumber, description: $description, natureCodeId: $natureCodeId}
  ) {
    chatroom {
      ...ChatroomData
    }
  }
}
    ${ChatroomDataFragmentDoc}`;
export type CreateChatroomMutationFn = Apollo.MutationFunction<CreateChatroomMutation, CreateChatroomMutationVariables>;

/**
 * __useCreateChatroomMutation__
 *
 * To run a mutation, you first call `useCreateChatroomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatroomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatroomMutation, { data, loading, error }] = useCreateChatroomMutation({
 *   variables: {
 *      label: // value for 'label'
 *      callerPhoneNumber: // value for 'callerPhoneNumber'
 *      description: // value for 'description'
 *      natureCodeId: // value for 'natureCodeId'
 *   },
 * });
 */
export function useCreateChatroomMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatroomMutation, CreateChatroomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatroomMutation, CreateChatroomMutationVariables>(CreateChatroomDocument, options);
      }
export type CreateChatroomMutationHookResult = ReturnType<typeof useCreateChatroomMutation>;
export type CreateChatroomMutationResult = Apollo.MutationResult<CreateChatroomMutation>;
export type CreateChatroomMutationOptions = Apollo.BaseMutationOptions<CreateChatroomMutation, CreateChatroomMutationVariables>;
export const CreateChatroomNoteDocument = gql`
    mutation CreateChatroomNote($note: String, $chatroomId: ID!) {
  createChatroomNote(input: {note: $note, chatroomId: $chatroomId}) {
    chatroomNote {
      ...ChatroomNoteData
    }
  }
}
    ${ChatroomNoteDataFragmentDoc}`;
export type CreateChatroomNoteMutationFn = Apollo.MutationFunction<CreateChatroomNoteMutation, CreateChatroomNoteMutationVariables>;

/**
 * __useCreateChatroomNoteMutation__
 *
 * To run a mutation, you first call `useCreateChatroomNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatroomNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatroomNoteMutation, { data, loading, error }] = useCreateChatroomNoteMutation({
 *   variables: {
 *      note: // value for 'note'
 *      chatroomId: // value for 'chatroomId'
 *   },
 * });
 */
export function useCreateChatroomNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatroomNoteMutation, CreateChatroomNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatroomNoteMutation, CreateChatroomNoteMutationVariables>(CreateChatroomNoteDocument, options);
      }
export type CreateChatroomNoteMutationHookResult = ReturnType<typeof useCreateChatroomNoteMutation>;
export type CreateChatroomNoteMutationResult = Apollo.MutationResult<CreateChatroomNoteMutation>;
export type CreateChatroomNoteMutationOptions = Apollo.BaseMutationOptions<CreateChatroomNoteMutation, CreateChatroomNoteMutationVariables>;
export const EditChatroomDocument = gql`
    mutation EditChatroom($description: String, $chatroomId: ID!, $resolved: Boolean) {
  editChatroom(
    input: {chatroomId: $chatroomId, description: $description, resolved: $resolved}
  ) {
    chatroom {
      ...ChatroomData
    }
  }
}
    ${ChatroomDataFragmentDoc}`;
export type EditChatroomMutationFn = Apollo.MutationFunction<EditChatroomMutation, EditChatroomMutationVariables>;

/**
 * __useEditChatroomMutation__
 *
 * To run a mutation, you first call `useEditChatroomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditChatroomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editChatroomMutation, { data, loading, error }] = useEditChatroomMutation({
 *   variables: {
 *      description: // value for 'description'
 *      chatroomId: // value for 'chatroomId'
 *      resolved: // value for 'resolved'
 *   },
 * });
 */
export function useEditChatroomMutation(baseOptions?: Apollo.MutationHookOptions<EditChatroomMutation, EditChatroomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditChatroomMutation, EditChatroomMutationVariables>(EditChatroomDocument, options);
      }
export type EditChatroomMutationHookResult = ReturnType<typeof useEditChatroomMutation>;
export type EditChatroomMutationResult = Apollo.MutationResult<EditChatroomMutation>;
export type EditChatroomMutationOptions = Apollo.BaseMutationOptions<EditChatroomMutation, EditChatroomMutationVariables>;
export const ArchivedChatroomsListDocument = gql`
    query ArchivedChatroomsList {
  chatrooms(resolved: true) {
    ...ChatroomData
  }
}
    ${ChatroomDataFragmentDoc}`;

/**
 * __useArchivedChatroomsListQuery__
 *
 * To run a query within a React component, call `useArchivedChatroomsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArchivedChatroomsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArchivedChatroomsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useArchivedChatroomsListQuery(baseOptions?: Apollo.QueryHookOptions<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>(ArchivedChatroomsListDocument, options);
      }
export function useArchivedChatroomsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>(ArchivedChatroomsListDocument, options);
        }
export type ArchivedChatroomsListQueryHookResult = ReturnType<typeof useArchivedChatroomsListQuery>;
export type ArchivedChatroomsListLazyQueryHookResult = ReturnType<typeof useArchivedChatroomsListLazyQuery>;
export type ArchivedChatroomsListQueryResult = Apollo.QueryResult<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>;
export const ChatroomNotesListDocument = gql`
    query ChatroomNotesList($chatroomId: ID!) {
  chatroomNotes(chatroomId: $chatroomId) {
    ...ChatroomNoteData
  }
}
    ${ChatroomNoteDataFragmentDoc}`;

/**
 * __useChatroomNotesListQuery__
 *
 * To run a query within a React component, call `useChatroomNotesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatroomNotesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatroomNotesListQuery({
 *   variables: {
 *      chatroomId: // value for 'chatroomId'
 *   },
 * });
 */
export function useChatroomNotesListQuery(baseOptions: Apollo.QueryHookOptions<ChatroomNotesListQuery, ChatroomNotesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatroomNotesListQuery, ChatroomNotesListQueryVariables>(ChatroomNotesListDocument, options);
      }
export function useChatroomNotesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatroomNotesListQuery, ChatroomNotesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatroomNotesListQuery, ChatroomNotesListQueryVariables>(ChatroomNotesListDocument, options);
        }
export type ChatroomNotesListQueryHookResult = ReturnType<typeof useChatroomNotesListQuery>;
export type ChatroomNotesListLazyQueryHookResult = ReturnType<typeof useChatroomNotesListLazyQuery>;
export type ChatroomNotesListQueryResult = Apollo.QueryResult<ChatroomNotesListQuery, ChatroomNotesListQueryVariables>;
export const ChatroomsListDocument = gql`
    query ChatroomsList {
  chatrooms {
    ...ChatroomData
  }
}
    ${ChatroomDataFragmentDoc}`;

/**
 * __useChatroomsListQuery__
 *
 * To run a query within a React component, call `useChatroomsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatroomsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatroomsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatroomsListQuery(baseOptions?: Apollo.QueryHookOptions<ChatroomsListQuery, ChatroomsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatroomsListQuery, ChatroomsListQueryVariables>(ChatroomsListDocument, options);
      }
export function useChatroomsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatroomsListQuery, ChatroomsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatroomsListQuery, ChatroomsListQueryVariables>(ChatroomsListDocument, options);
        }
export type ChatroomsListQueryHookResult = ReturnType<typeof useChatroomsListQuery>;
export type ChatroomsListLazyQueryHookResult = ReturnType<typeof useChatroomsListLazyQuery>;
export type ChatroomsListQueryResult = Apollo.QueryResult<ChatroomsListQuery, ChatroomsListQueryVariables>;
export const NatureCodesDocument = gql`
    query NatureCodes {
  natureCodes {
    id
    name
  }
}
    `;

/**
 * __useNatureCodesQuery__
 *
 * To run a query within a React component, call `useNatureCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNatureCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNatureCodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNatureCodesQuery(baseOptions?: Apollo.QueryHookOptions<NatureCodesQuery, NatureCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NatureCodesQuery, NatureCodesQueryVariables>(NatureCodesDocument, options);
      }
export function useNatureCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NatureCodesQuery, NatureCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NatureCodesQuery, NatureCodesQueryVariables>(NatureCodesDocument, options);
        }
export type NatureCodesQueryHookResult = ReturnType<typeof useNatureCodesQuery>;
export type NatureCodesLazyQueryHookResult = ReturnType<typeof useNatureCodesLazyQuery>;
export type NatureCodesQueryResult = Apollo.QueryResult<NatureCodesQuery, NatureCodesQueryVariables>;