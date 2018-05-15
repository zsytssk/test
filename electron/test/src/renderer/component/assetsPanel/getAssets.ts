import { assetsFolder } from '../../ipc';

const assetsTmp = [];
export async function getAssets() {
  return new Promise((resolve, reject) => {
    if (assetsTmp.length) {
      return resolve(assetsTmp);
    }
    assetsFolder().then(data => {
      resolve(data);
    });
  });
}
