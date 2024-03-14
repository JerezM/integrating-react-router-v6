

interface useEntityServiceProps {
    endpoint: string;
}

export interface CustomRequestProps {
    body?: object; 
    endpoint?: string; 
    params?: Record<string, string>;
}

export const useEntityService = (props: useEntityServiceProps)  => {

    const baseUrl = process.env.REACT_APP_BACKEND_URL as string ?? "http://localhost:8080/api";

    const prepareRequest = async (httpMethod: string, bodyObject?: object): Promise<RequestInit> => {
        const requestOptions: RequestInit = {
            method: httpMethod,
            headers: {
                'Content-type': 'application/json',
            },
            body: bodyObject ? JSON.stringify(bodyObject) : null,
        };

        return requestOptions;
    }

    const executeRequest = async <T>(request: RequestInit, endpoint?: string, params?: Record<string, string>): Promise<T> => {
        const queryParams = new URLSearchParams(params).toString();
        const requestUrl: string = baseUrl + props.endpoint + (endpoint ?? '') + (params ? `?${queryParams}` : '');        
        try {
            const response = await fetch(requestUrl, request);
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg);
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json() as T;
            } else {
                return {} as T;
            }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const get = async <T>(customRequestProps?: CustomRequestProps): Promise<T> => {
        const {body, endpoint, params} = customRequestProps ?? {};
        const request = await prepareRequest("GET", body);
        return executeRequest(request, endpoint, params);
    }

    const post = async <T>(customRequestProps?: CustomRequestProps): Promise<T> => {
        const {body, endpoint, params} = customRequestProps ?? {};
        const request = await prepareRequest("POST", body);
        return executeRequest(request, endpoint, params);
    }

    const put = async <T>(customRequestProps?: CustomRequestProps): Promise<T> => {
        const {body, endpoint, params} = customRequestProps ?? {};
        const request = await prepareRequest("PUT", body);
        return executeRequest(request, endpoint, params);
    }

    const del = async <T>(customRequestProps?: CustomRequestProps): Promise<T> => {
        const {body, endpoint, params} = customRequestProps ?? {};
        const request = await prepareRequest("DELETE", body);
        return executeRequest(request, endpoint, params);
    }

    return { get, post, put, del };
}