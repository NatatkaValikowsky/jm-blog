import React from "react";

export interface PrivateRoutesProps{
    children: React.ReactNode
    path: string,
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    }
}