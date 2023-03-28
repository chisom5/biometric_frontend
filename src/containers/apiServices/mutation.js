import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $password: String!
    $isSuperuser: Boolean!
    $username: String!
    $firstName: String
    $lastName: String
    $email: String
    $isStaff: Boolean!
    $canLogin: Boolean!
  ) {
    createUser(
      password: $password
      isSuperuser: $isSuperuser
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      isStaff: $isStaff
      canLogin: $canLogin
    ) {
      id
      isStaff
      isSuperuser
      firstName
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser(
    $id: UUID!
    $password: String
    $isSuperuser: Boolean
    $username: String
    $firstName: String
    $lastName: String
    $email: String
    $isActive: Boolean
    $isStaff: Boolean
    $canLogin: Boolean
  ) {
    updateUser(
      id: $id
      isActive: $isActive
      password: $password
      isSuperuser: $isSuperuser
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      isStaff: $isStaff
      canLogin: $canLogin
    ) {
      id
      isStaff
      isSuperuser
      firstName
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const CREATE_FILE = gql`
  mutation createFile(
    $name: String!
    $mimeType: String!
    $fileMetadata: JSONObject
    $file: Upload!
  ) {
    createFile(
      name: $name
      mimeType: $mimeType
      fileMetadata: $fileMetadata
      file: $file
    ) {
      id
      name
      mimeType
      fileMetadata
      file
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id) {
      id
    }
  }
`;

export const UPDATE_FILE = gql`
  mutation updateFile(
    $id: UUID!
    $name: String
    $mimeType: String
    $fileMetadata: JSONObject
    $file: Upload
  ) {
    updateFile(
      id: $id
      name: $name
      mimeType: $mimeType
      fileMetadata: $fileMetadata
      file: $file
    ) {
      id
      name
      mimeType
      fileMetadata
      file
    }
  }
`;
