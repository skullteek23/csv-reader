import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// callable functions
export const thumbnailOnReq = functions.https.onCall(
  async (receievedData, context) => {
    try {
      const bac = admin.storage();
      const data: { uids: string; imgpath_lg: string }[] = receievedData;
      const newImageslist: any[] = [];
      data.forEach(async (imageListItem) => {
        if (imageListItem && imageListItem.imgpath_lg) {
          // const urlToObject = async () => {
          // const response = await fetch(imageListItem.imgpath_lg);
          // // here image is url/location of image
          // const blob = await response.blob();
          // const file = new File([blob], 'image.jpg', {
          //   type: blob.type,
          // });
          const file = bac
            .bucket('freekyk-prod.appspot.com')
            .file(imageListItem.imgpath_lg);
          newImageslist.push({
            ...imageListItem,
            imageFile: file,
          });
        }
      });
      return newImageslist;
    } catch (error) {
      return error;
    }
  }
);
// callable functions
