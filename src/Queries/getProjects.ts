import { gql, GraphQLClient } from "graphql-request";

export const getProjects = async (gqlClient: GraphQLClient, userId: string) => {
    //todo: implement screenshot and get all screenshots from each scene in the project
    const query = gql`
        query Query($where: ProjectWhereInput) {
            projects(where: $where) {
                id
                name
                updatedAt
            }
        }
    `;
    const where = {
        "where": {
          "userId": {
            "equals": userId
          }
        }
      }
    const resp = await gqlClient.request(query, where);
    return resp;
}