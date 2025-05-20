const API_BASE_URL = "https://cdn.contentful.com";
const API_SPACE_ID = "2f8bh3xz5t4r";
const API_TOKEN = "w_iD0iNnkKr2HotiAweKs5FNWBeFFRyGyC8WZ05sY04";

export function getEntryApiEndpoint(entryId, options) {
  let optionsString = "";
  if (options && options.length > 0) {
    options.forEach(
      (option) => (optionsString += `&${option.key}=${option.value}`)
    );
  }
  return `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries/?sys.id=${entryId}${optionsString}&access_token=${API_TOKEN}`;
}

export function getAllEntriesByContentTypeApiEndpoint(contentType, options) {
  let optionsString = "";
  if (options && options.length > 0) {
    options.forEach((option) => {
      return (optionsString += `&${option.key}=${option.value}`);
    });
  }
  return `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?content_type=${contentType}${optionsString}&access_token=${API_TOKEN}`;
}

function getURLForAssetID(id, assets) {
  const match = assets.find((asset) => asset.id === id);
  return match.url;
}

function getEntryForEntryID(id, entries) {
  const match = entries.find((entry) => entry.id === id);
  return match;
}

function maybeGetAssetURL(field, fields, assets) {
  if (fields[field]) {
    const assetID = fields[field].sys.id;
    return getURLForAssetID(assetID, assets);
  }
  return undefined;
}

export function processEntryResponse(responseData, expectedFields) {
  const assets = responseData.includes.Asset.map((asset) => ({
    id: asset.sys.id,
    url: asset.fields.file.url,
    title: asset.fields.title,
    description: asset.fields.description,
  }));

  const { fields } = responseData.items[0];

  const response = {};

  expectedFields.forEach((field) => {
    // fields with a sys object are assets
    if (fields[field].sys) {
      response[field] = maybeGetAssetURL(field, fields, assets);
    } else {
      response[field] = fields[field];
    }
  });

  return {
    entry: response,
    assets,
  };
}

// For fetching all entries of a specific content type
export function processEntryListResponse(responseData, expectedFields) {
  const assets = [];
  if (responseData.includes.Asset) {
    responseData.includes.Asset.forEach((asset) => {
      assets.push({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title,
        description: asset.fields.description,
      });
    });
  }

  const entries = [];

  responseData.items.forEach((entry) => {
    const { fields } = entry;

    const entryStaging = {};

    entryStaging.id = entry.sys.id;

    expectedFields.forEach((field) => {
      // fields with a sys object are assets
      if (fields[field] && fields[field].sys) {
        entryStaging[field] = maybeGetAssetURL(field, fields, assets);
      } else {
        entryStaging[field] = fields[field];
      }
    });

    entries.push(entryStaging);
  });

  return {
    entries,
    assets,
  };
}

export function processSingletonWrappedResponse(responseData, expectedFields) {
  const assets = responseData.includes.Asset.map((asset) => ({
    id: asset.sys.id,
    url: asset.fields.file.url,
    title: asset.fields.title,
    description: asset.fields.description,
  }));

  const { fields } = responseData.includes.Entry[0];

  const response = {};

  response.id = responseData.includes.Entry[0].sys.id;

  expectedFields.forEach((field) => {
    // fields with a sys object are assets
    if (fields[field].sys) {
      response[field] = maybeGetAssetURL(field, fields, assets);
    } else {
      response[field] = fields[field];
    }
  });

  return {
    entry: response,
    assets,
  };
}

// For fetching all entries from a list
export function processListResponse(responseData, expectedFields) {
  const assets = [];
  if (responseData.includes.Asset) {
    responseData.includes.Asset.forEach((asset) => {
      assets.push({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title,
        description: asset.fields.description,
      });
    });
  }

  const allEntries = [];

  responseData.includes.Entry.forEach((entry) => {
    const { fields } = entry;

    const entryStaging = {};

    expectedFields.forEach((field) => {
      // fields with a sys object are assets
      if (fields[field] && fields[field].sys) {
        entryStaging[field] = maybeGetAssetURL(field, fields, assets);
      } else {
        entryStaging[field] = fields[field];
      }
    });

    entryStaging.id = entry.sys.id;

    allEntries.push(entryStaging);
  });

  const orderedEntriesList = responseData.items[0].fields.entries;

  const sortedEntries = orderedEntriesList.map((entry) =>
    getEntryForEntryID(entry.sys.id, allEntries)
  );

  return {
    entries: sortedEntries,
    assets,
  };
}

export function processProgramEntryResponse(responseData, expectedFields) {
  const assets = responseData.includes.Asset.map((asset) => ({
    id: asset.sys.id,
    url: asset.fields.file.url,
    title: asset.fields.title,
    description: asset.fields.description,
  }));

  const linkedEntries = responseData.includes.Entry.map((entry) => {
    const staging = {};
    let currentField;

    switch (entry.sys.contentType.sys.id) {
      case "imageWithText":
        currentField = entry.fields;

        staging.id = entry.sys.id;
        staging.entry = assets.find(
          (asset) => asset.id === currentField.image.sys.id
        );
        return staging;

      case "studentProjects":
        const entryStaging = {};
        currentField = entry.fields;
        staging.id = entry.sys.id;

        entryStaging.title = currentField.title;
        entryStaging.description = currentField.description;
        entryStaging.imagesAndVideo = currentField.imagesAndVideo.map(
          (item) => {
            const match = responseData.includes.Entry.find(
              (entry) => entry.sys.id === item.sys.id
            );

            const matchedAsset = match.fields.image
              ? assets.find((asset) => asset.id === match.fields.image.sys.id)
              : assets.find((asset) => asset.id === match.fields.video.sys.id);

            return match.fields.image
              ? { ...matchedAsset, ...{ type: "image" } }
              : { ...matchedAsset, ...{ type: "video" } };
          }
        );

        return { ...staging, ...{ entry: entryStaging } };

      case "entryList":
        currentField = entry.fields;
        staging.id = entry.sys.id;
        staging.entry = { listName: currentField.listName };
        return staging;

      default:
        staging.id = entry.sys.id;
        staging.entry = entry.fields;
        return staging;
    }
  });

  const entry = responseData.items[0];
  const { fields } = entry;

  const response = {};

  expectedFields.forEach((field) => {
    if (fields[field]) {
      if (
        field !== "subjectArea" &&
        field !== "mediaArtsStrain" &&
        Array.isArray(fields[field])
      ) {
        if (fields[field].length > 0) {
          response[field] = fields[field].map((item) => {
            const match = linkedEntries.find(
              (linkedEntry) => linkedEntry.id === item.sys.id
            );

            return match.entry;
          });
        } else {
          response[field] = [];
        }
      } else if (fields[field].sys) {
        const match = linkedEntries.find(
          (entry) => entry.id === fields[field].sys.id
        );
        response[field] = match.entry;
      } else {
        response[field] = fields[field];
      }
    }
  });

  response.id = entry.sys.id;

  return {
    entry: response,
    assets,
  };
}

export function processProgramsListResponse(responseData) {
  const allPrograms = [];
  const allProgramsContainers = [];
  const responseStaging = [];

  responseData.includes.Entry.forEach((entry) => {
    const { fields } = entry;

    if (entry.sys.contentType.sys.id === "program") {
      const programStaging = {};
      programStaging.id = entry.sys.id;
      programStaging.title = fields.title;
      programStaging.summary = fields.summary;
      programStaging.type = "program";

      allPrograms.push(programStaging);
    } else if (entry.sys.contentType.sys.id === "entryList") {
      const programContainerStaging = {};
      programContainerStaging.id = entry.sys.id;
      programContainerStaging.name = fields.listName;
      programContainerStaging.description = fields.listDescription;
      programContainerStaging.programIds = fields.entries.map((entry) => ({
        id: entry.sys.id,
      }));

      allProgramsContainers.push(programContainerStaging);
    }
  });

  const orderedEntriesList = responseData.items[0].fields.entries;

  orderedEntriesList.forEach((entry) => {
    const matchedProgram = allPrograms.find(
      (program) => program.id === entry.sys.id
    );

    if (matchedProgram) {
      responseStaging.push(matchedProgram);
    } else {
      const matchedContainer = allProgramsContainers.find(
        (container) => container.id === entry.sys.id
      );
      const programContainerStaging = {};
      const programsInContainer = [];

      matchedContainer.programIds.forEach((programId) => {
        programsInContainer.push(
          allPrograms.find((program) => program.id === programId.id)
        );
      });

      programContainerStaging.name = matchedContainer.name;
      programContainerStaging.programs = programsInContainer;
      programContainerStaging.type = "programsContainer";
      programContainerStaging.description = matchedContainer.description;

      responseStaging.push(programContainerStaging);
    }
  });

  return {
    featuredPrograms: responseStaging,
  };
}

export function processResourceSearchResponse(responseData) {
  const assets = [];
  if (responseData.includes.Asset) {
    responseData.includes.Asset.forEach((asset) => {
      assets.push({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title,
        description: asset.fields.description,
      });
    });
  }

  const allFiles = [];

  responseData.includes.Entry.forEach((entry) => {
    const entryStaging = {};

    entryStaging.id = entry.sys.id;
    entryStaging.title = entry.fields.title;
    entryStaging.fileUrl = getURLForAssetID(entry.fields.file.sys.id, assets);

    allFiles.push(entryStaging);
  });

  const processedResults = responseData.items.map((item) => {
    const fields = item.fields;
    const itemStaging = {};

    const resourceFiles = fields.resourceFiles.map((fileLink) => {
      return allFiles.find((file) => file.id === fileLink.sys.id);
    });

    itemStaging.id = item.sys.id;
    itemStaging.title = fields.title;
    itemStaging.description = fields.description;
    itemStaging.subjectArea = fields.subjectArea;
    itemStaging.mediaArtsStrain = fields.mediaArtsStrain;
    itemStaging.gradeLevel = fields.gradeLevel;
    itemStaging.standard = fields.standard;
    itemStaging.resourceFiles = resourceFiles;

    return itemStaging;
  });

  return {
    results: processedResults,
  };
}
