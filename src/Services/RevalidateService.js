"use server";

import { revalidatePath } from "next/cache";
import { getAllPagesMetaData } from "./SectionsApis";

export const revalidatePage = async (path) => {    
    try {
        await revalidatePath(path);
        return `Invalidated Path: ${path}`;
    } catch (error) {
        console.error(`Error invalidating: ${path}`, error);
        return `Failed to invalidate Path: ${path}`;
    }
};

export const revalidateAllPages = async () => {    
    try {
        const success = [];
        const failed = [];

        const pages = await getAllPagesMetaData();
        const pageRoutes = pages.map(page => (page.slug === "home" ? "/" : `/${page.slug}`));

        await Promise.all(
            pageRoutes.map(async (route) => {
                try {
                    await revalidatePath(route);
                    success.push(route);
                } catch (error) {
                    failed.push(route);
                    console.error(`Failed to invalidate path: ${route}`, error);
                }
            })
        );

        return { success, failed };
    } catch (error) {
        console.error("Error invalidating site", error);
        return { success: [], failed: ["Error occurred during the invalidation process."] };
    }
};
