import { gql, GraphQLClient } from "graphql-request";
import { Project } from "../Types/Project";
import { buildProjectMutationInput } from "../Functions/buildProjectMutationInput";

export const saveAs = async(gqlClient: GraphQLClient, project: Project): Promise<boolean> => {
    console.log('project',project)
    const data = buildProjectMutationInput(project);
    const mutation = gql`
        mutation CreateProject($data: ProjectCreateInput!) {
            createProject(data: $data) {
                id
                user{
                    email
                }
                threeObjects {
                    id
                    geometry {
                        id
                    }
                    material {
                        id
                    }
                }
            }
        }
    `;

    try{
        //todo: add authentication support
        //todo: add screenshot blob to request
        await gqlClient.request(mutation, data)
        console.log('save successfull');
        return true;
    } catch(e){
        console.log('error saving data')
        console.log(e)
        return false;
    }
}