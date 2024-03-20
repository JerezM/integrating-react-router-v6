export enum Views {
    HOME,
    ITEMS,
    SETTINGS,
    PROFILE,
    ADMIN,
    NOT_FOUND,
}

interface PathNode {
    id: Views | null,
    path: string,
    children?: PathNode[],
}

const paths: PathNode[] = [
    {
        id: Views.HOME,
        path: "/",
    },
    {
        id: Views.ITEMS,
        path: "/items",
    },
    {
        id: Views.SETTINGS,
        path: "/settings",
        children: [
            {
                id: Views.PROFILE,
                path: "/profile",
            },
            {
                id: Views.ADMIN,
                path: "/admin",
            }
        ]
    },
    {
        id: Views.NOT_FOUND,
        path: "/not-found",
    },        
];

/**
 * Recursively searches for a specific `PathNode` by its `id` within an array of `PathNode`s.
 * If the target node is found, it constructs the full path to it by utilizing a stack to
 * store path segments found during the search.
 * 
 * @param {PathNode[]} nodes - The array of nodes to be searched.
 * @param {Views} targetId - The ID of the target node.
 * @param {string[]} stack - An array acting as a stack to store found path segments.
 * @returns {boolean} Returns `true` if the target node is found, otherwise `false`.
 */
const findPath = (nodes: PathNode[], targetId: Views, stack: string[]): boolean => {
    for (const node of nodes) {
        if (node.id === targetId) {
            stack.push(node.path); // It found the node, then add the path into the stack
            return true; // Indicates that founds the node
        }
        if (node.children) {
            if (findPath(node.children, targetId, stack)) {
                // If it finds the node in the childrens, then it also add the path of the parent into the stack
                stack.push(node.path);
                return true;
            }
        }
    }

    return false; // The node was not found
};

export const getPath = (id: Views): string => {
    const pathsStack: string[] = [];
    const idFounded = findPath(paths, id, pathsStack);

    if (!idFounded) {
        return "";
    } else {
        return pathsStack.reverse().join("");
    }
}