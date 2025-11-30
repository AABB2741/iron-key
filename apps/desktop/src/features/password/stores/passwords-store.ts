import { ensureDesktop } from "@/utils/ensure-desktop";
import { load } from "@tauri-apps/plugin-store";
import { produce } from "immer";
import z from "zod";

const STORE_FILENAME = "ironkey.json";
const PASSWORDS_STORE_KEY = "@ironkey/passwords";

const storeItem = z.object({
  id: z.uuid(),
  name: z.string().nullable(),
  siteUrl: z.string().nullable(),
  login: z.string().nullable(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const storeSchema = z.object({
  version: z.int().positive(),
  passwords: z.array(storeItem),
});

type Store = z.infer<typeof storeSchema>;
type StoreItem = z.infer<typeof storeItem>;

const storeDefaults: Store = { version: 1, passwords: [] };

const store = await load(STORE_FILENAME, {
  autoSave: true,
  defaults: storeDefaults,
});

export const passwordsStore = {
  async listAll() {
    ensureDesktop();
    const current = await this.getStore();
    return current.passwords;
  },
  async add(item: StoreItem) {
    ensureDesktop();
    const newItem = storeItem.parse(item);

    const current = await this.getStore();

    if (current.passwords.some((p) => p.id === newItem.id)) {
      await this.update(newItem.id, newItem);
    }

    const updated = produce(current, (draft) => {
      draft.passwords.push(newItem);
    });
    await store.set(PASSWORDS_STORE_KEY, updated);
  },
  async getById(id: string) {
    ensureDesktop();
    const current = await this.getStore();

    return current.passwords.find((p) => p.id === id) || null;
  },
  async update(id: string, data: Partial<StoreItem>) {
    ensureDesktop();
    const current = await this.getStore();

    const updated = produce(current, (draft) => {
      const index = draft.passwords.findIndex((p) => p.id === id);

      if (index === -1) {
        return;
      }

      Object.assign(draft.passwords[index], data);
    });

    await store.set(PASSWORDS_STORE_KEY, updated);
  },
  async remove(id: string) {
    ensureDesktop();
    const current = await this.getStore();

    const updated = produce(current, (draft) => {
      draft.passwords = draft.passwords.filter((p) => p.id !== id);
    });

    await store.set(PASSWORDS_STORE_KEY, updated);
  },
  async getStore() {
    ensureDesktop();
    const data = await store.get<Store>(PASSWORDS_STORE_KEY);
    return data ?? storeDefaults;
  },
};
