export function getEntryApiEndpoint(entryId, options) {
  let optionsString = "";
  if (options && options.length > 0) {
    options.forEach(
      (option) => (optionsString += `&${option.key}=${option.value}`)
    );
  }
  return `${process.env.API_BASE_URL}/spaces/${process.env.API_SPACE_ID}/entries/?sys.id=${entryId}${optionsString}&access_token=${process.env.API_TOKEN}`;
}

export function getAllEntriesByContentTypeApiEndpoint(contentType, options) {
  let optionsString = "";
  if (options && options.length > 0) {
    options.forEach((option) => {
      return (optionsString += `&${option.key}=${option.value}`);
    });
  }
  return `${process.env.API_BASE_URL}/spaces/${process.env.API_SPACE_ID}/entries?content_type=${contentType}${optionsString}&access_token=${process.env.API_TOKEN}`;
}

function getURLForAssetID(id, assets) {
  const match = assets.find((asset) => asset.id === id);
  return match.url;
}

export function maybeGetAssetURL(field, fields, assets) {
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
