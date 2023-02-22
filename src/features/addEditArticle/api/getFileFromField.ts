/**
 *
 * @param formData
 * @param formField : name of the input field
 * @returns  a file
 */
export default async function getFileFromField(
  formData: FormData,
  formField: string
) {
  if (formData.getAll(formField).length > 0) {
    const filenames = await Promise.all(
      formData.getAll(formField).map(async (formDataEntryValue) => {
        const file = formDataEntryValue as File;
        return {
          webkitRelativePath: file.webkitRelativePath,
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          buffer: {
            type: 'Buffer',
            value: Array.from(new Int8Array(await file.arrayBuffer()).values()),
          },
        };
      })
    );

    const file = Buffer.from(filenames[0].buffer.value);

    return file;
  }
  return undefined;
}
