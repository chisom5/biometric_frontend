import { gql } from "@apollo/client";

export const GET_ALL_FILES = gql`
  query allFiles($page: Int, $pageSize: Int) {
    allFiles(page: $page, pageSize: $pageSize) {
      items {
        id
        name
        createdAt
        file
        mimeType
        fileMetadata
        file
      }
      pageInfo {
        totalCount
        pageSize
        totalPages
        currentPage
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query allUsers($page: Int, $pageSize: Int) {
    allUsers(page: $page, pageSize: $pageSize) {
      items {
        id
        firstName
        lastName
        username
        email
        isActive
        isSuperuser
        isStaff
        dateJoined
        canLogin
      }

      pageInfo {
        totalCount
        pageSize
        totalPages
        currentPage
      }
    }
  }
`;
