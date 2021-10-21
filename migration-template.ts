import { getApp } from "../src/migrations";

export async function up() {
    const app = await getApp();
}

export async function down() {
    const app = await getApp();
}
