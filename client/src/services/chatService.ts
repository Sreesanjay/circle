import { toast } from "react-toastify";
import API from "../api"
import { AxiosError } from "axios";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../app/firebase";

export async function createChat(id: string) {
    try {
        const response = await API.post('/chat', { user_id: id }, { withCredentials: true })
        if (response.data) {
            return response.data.chat;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}
type CreateGroup = {
    chat_name: string;
    members: string[]
}
export async function createGroup(data: CreateGroup) {
    try {
        const response = await API.post('/chat/group', data, { withCredentials: true })
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

//fetch all chats
export async function getAllChats() {
    try {
        const response = await API.get('/chat', { withCredentials: true })
        if (response.data) {
            return response.data.chats;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

// send message
type sendMessage = {
    sender_id: string;
    content: string;
    content_type: string;
    file_type?: string;
    chat_id: string;
}
export async function sendMessage(message: sendMessage) {
    try {
        const response = await API.post('/message', message, { withCredentials: true })
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}
export async function getMessages(chat_id: string, page: Date | null) {
    try {
        const response = await API.get(`/message/${chat_id}?page=${page ? page : ''}`, { withCredentials: true })
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function readMessage(message_id: string) {
    try {
        const response = await API.put(`/message/read/${message_id}`, {}, { withCredentials: true })
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function changeChatName({ chat_name, chat_id }: { chat_name: string, chat_id: string }) {
    try {
        const response = await API.put(`/chat/chat_name/${chat_id}`, { chat_name }, { withCredentials: true })
        if (response.data) {
            return response.data
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function addMember({ chat_id, user }: { user: string, chat_id: string }) {
    try {
        const response = await API.put(`/chat/members/${chat_id}`, { user }, { withCredentials: true })
        if (response.data) {
            return response.data
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function removeMember({ chat_id, user }: { user: string, chat_id: string }) {
    try {
        const response = await API.put(`/chat/members/remove/${chat_id}`, { user }, { withCredentials: true })
        if (response.data) {
            return response.data
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function isBlocked(user: string) {
    try {
        const response = await API.get(`/chat/members/is-blocked/${user}`, { withCredentials: true })
        if (response.data) {
            return response.data
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function deleteMessage(id: string) {
    try {
        const response = await API.delete(`/message/${id}`, { withCredentials: true })
        if (response.data) {
            return response.data
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}


export async function changeGroupIcon({ chat_id, icon }: { chat_id: string, icon: Blob }) {
    try {

        const content = new File([icon], "groupIocn", {
            type: (icon).type,
        });
        const filename = new Date().getTime() + (content as File).name;
        const storageRef = ref(storage, 'groupIcon/' + filename);
        const snapshot = await uploadBytes(storageRef, (content))
        if (snapshot) {
            const url = await getDownloadURL(storageRef);
            if (url) {
                const response = await API.put(`/chat/icon/${chat_id}`, { icon: url }, { withCredentials: true })
                if (response.data) {
                    return response.data
                } else {
                    throw new Error('Internal Error')
                }
            }
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function sendFileMessage(file: File) {
    try {
        const filename = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'message/' + filename);
        const snapshot = await uploadBytes(storageRef, file)
        if (snapshot) {
            const url = await getDownloadURL(storageRef);
            if (url) {
                return url;
            } else {
                throw new Error("can't upload the file")
            }
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function deleteFile(url: string) {
    try {
        const storageRef = ref(storage, url);
        deleteObject(storageRef);
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}

export async function getChat(userId: string) {
    try {
        const response = await API.get(`/chat/get-chat/${userId}`)
        if (response.data) {
            return response.data
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.response?.data.message)
    }
}
