/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFamily = /* GraphQL */ `
  subscription OnCreateFamily {
    onCreateFamily {
      id
      name
      members {
        items {
          id
          name
          color
          icon
          familyID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFamily = /* GraphQL */ `
  subscription OnUpdateFamily {
    onUpdateFamily {
      id
      name
      members {
        items {
          id
          name
          color
          icon
          familyID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFamily = /* GraphQL */ `
  subscription OnDeleteFamily {
    onDeleteFamily {
      id
      name
      members {
        items {
          id
          name
          color
          icon
          familyID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember {
    onCreateMember {
      id
      name
      color
      icon
      familyID
      family {
        id
        name
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      events {
        items {
          id
          name
          description
          start
          end
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember {
    onUpdateMember {
      id
      name
      color
      icon
      familyID
      family {
        id
        name
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      events {
        items {
          id
          name
          description
          start
          end
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember {
    onDeleteMember {
      id
      name
      color
      icon
      familyID
      family {
        id
        name
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      events {
        items {
          id
          name
          description
          start
          end
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      name
      description
      start
      end
      memberID
      member {
        id
        name
        color
        icon
        familyID
        family {
          id
          name
          createdAt
          updatedAt
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      name
      description
      start
      end
      memberID
      member {
        id
        name
        color
        icon
        familyID
        family {
          id
          name
          createdAt
          updatedAt
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      name
      description
      start
      end
      memberID
      member {
        id
        name
        color
        icon
        familyID
        family {
          id
          name
          createdAt
          updatedAt
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
