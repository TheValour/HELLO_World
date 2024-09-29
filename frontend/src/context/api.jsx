import React, { createContext } from "react";
import axios from 'axios';

export const APIContext = createContext();

export function APIContextProvider({ children }) {
    const API = import.meta.env.VITE_LINK;

    const loginUser = async (data) => {
        const response = await axios.post( `${API}/login`, {...data,},{ withCredentials: true });
        return response;
    };

    const registerUser = async (data) => {
        const response = await axios.post( `${API}/signup`, {...data,},{ withCredentials: true });
        return response;
    };

    const publishArticle = async (user, article) => {
        const response =  await axios.post(`${API}/write`, {
            "user": {
              "username": user.username,
              "email": user.email,
              "id": user._id,
              "isAdmin" : user.isAdmin
            },
            "article": {
              ...article,
              "createdAt": new Date()
            },
        });

        return response;
    };
    const UpdateArticleAPI = async (id, article) => {
        const response =  await axios.post(`${API}/update`, {
            "_id" : id,
            "article": {
              "quill" : article,
              "createdAt": new Date()
            },
        });

        return response;
    };

    const readArticle = async (id) => {
        const response = await axios.get(`${API}/read/${id}`);
        return response;
    };

    const getArticleList = async (filter) => {
        const response = await axios.get(`${API}/list/${filter === 'all' ? '' : filter}`);
        return response;
    };

    const getArticleById = async (id) => {
        const response = await axios.get(`${API}/article/${id}`);
        return response.data;
    };

    const getTagList = async () => {
        const response = await axios.get(`${API}/taglist`);
        return response;
    };
    const getAdminTagList = async () => {
        const response = await axios.get(`${API}/admintaglist`);
        return response;
    };

    const verifyUser= async () => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API}`,{ token },{ withCredentials: true })
        return response.data;
    }

    return (
        <APIContext.Provider 
            value={{ loginUser, registerUser, 
                publishArticle, UpdateArticleAPI, getArticleById, readArticle, getArticleList, 
                getTagList, getAdminTagList, verifyUser}}
        >
            {children}
        </APIContext.Provider>
    );
}
