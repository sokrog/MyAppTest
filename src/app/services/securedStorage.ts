import * as Keychain from 'react-native-keychain';

const STORAGE_KEY = 'app_secure_data';

export class SecuredStorage {
  async setItem(key: string, value: string): Promise<void> {
    const data = await this._getData();
    data[key] = value;
    await Keychain.setGenericPassword(STORAGE_KEY, JSON.stringify(data));
  }

  async getItem(key: string): Promise<string | null> {
    const data = await this._getData();
    return data[key] ?? null;
  }

  async removeItem(key: string): Promise<void> {
    const data = await this._getData();
    delete data[key];
    if (Object.keys(data).length === 0) {
      await Keychain.resetGenericPassword();
    } else {
      await Keychain.setGenericPassword(STORAGE_KEY, JSON.stringify(data));
    }
  }

  async clear(): Promise<void> {
    await Keychain.resetGenericPassword();
  }

  private async _getData(): Promise<Record<string, string>> {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (
        credentials &&
        credentials.username === STORAGE_KEY &&
        credentials.password
      ) {
        return JSON.parse(credentials.password);
      }
    } catch (error) {
      // Можно логировать ошибку
    }
    return {};
  }
}

export const securedStorage = new SecuredStorage();