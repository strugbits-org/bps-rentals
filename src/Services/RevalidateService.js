"use server";

import { revalidatePath } from "next/cache";
import logError from "@/Utils/ServerActions";

export const revalidatePage = async (path) => {
    try {
        await revalidatePath(path);
        return `Invalidated Path: ${path}`;
    } catch (error) {
        logError(`Error invalidating: ${path}`, error);
        return `Failed to invalidate Path: ${path}`;
    }
};

export const revalidateAllPages = async () => {
    try {
        await revalidatePath('/', 'layout');
        return `Invalidated Full Site`;
    } catch (error) {
        logError("Error invalidating site", error);
        return `Failed to invalidate Site`;
    }
};
