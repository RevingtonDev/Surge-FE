import { API_ROUTES } from "./routes";

const create_api_request = (endpoint, options) => {
  options.headers = {
    "Content-Type": "application/json",
  };
  options.credentials = "include";

  return fetch(endpoint, options);
};

const get_data = (form) => {
  const data = {};
  new FormData(form).forEach((val, key) => {
    if (key !== "year" && key !== "day" && key !== "month") data[key] = val;
  });

  if (form.year) {
    data["dateOfBirth"] =
      form.year.value +
      "-" +
      (form.month.value.length < 2
        ? "0" + form.month.value
        : form.month.value) +
      "-" +
      (form.day.value.length < 2 ? "0" + form.day.value : form.day.value);
  }

  return data;
};

const append_parameters = (url, parameters) => {
  url += "?";
  Object.entries(parameters).forEach((entry, index) => {
    url += entry[0] + "=" + entry[1] + "&&";
  });
  return url.substr(0, url.length - 2);
};

const authenticate = (form) => {
  return create_api_request(API_ROUTES.CREDENTIALS, {
    method: "POST",
    body: JSON.stringify(get_data(form)),
  });
};

const update_profile = (form) => {
  return create_api_request(API_ROUTES.PROFILE_UPDATE, {
    method: "PUT",
    body: JSON.stringify(get_data(form)),
  });
};

const deauthenticate = () => {
  return create_api_request(API_ROUTES.CREDENTIALS, {
    method: "DELETE",
  });
};

const authorization = (content) => {
  return create_api_request(
    append_parameters(API_ROUTES.AUTHORIZATION, {
      content: content,
    }),
    {
      method: "POST",
    }
  );
};

const create_profile = (form) => {
  return create_api_request(API_ROUTES.ADMIN_CREATE, {
    method: "PUT",
    body: JSON.stringify(get_data(form)),
  });
};

const get_users = (page, type, limit) => {
  return create_api_request(
    append_parameters(API_ROUTES.ADMIN_GET_USERS, {
      page: page,
      type: type,
      limit: limit,
    }),
    {
      method: "POST",
    }
  );
};

const search_profile = (keyword, page, limit) => {
  return create_api_request(
    append_parameters(API_ROUTES.ADMIN_SEARCH, {
      query: keyword,
      page: page,
      limit: limit,
    }),
    {
      method: "POST",
    }
  );
};

const create_note = (form) => {
  return create_api_request(API_ROUTES.STUDENT_NOTE, {
    method: "PUT",
    body: JSON.stringify(get_data(form)),
  });
};

const delete_note = (id) => {
  return create_api_request(
    append_parameters(API_ROUTES.STUDENT_NOTE, {
      id: id,
    }),
    {
      method: "DELETE",
    }
  );
};

const update_note = (form) => {
  return create_api_request(API_ROUTES.STUDENT_NOTES_UPDATE, {
    method: "PUT",
    body: JSON.stringify(get_data(form)),
  });
};

const get_notes = (page, limit, oldestFirst) => {
  return create_api_request(
    append_parameters(API_ROUTES.STUDENT_NOTES, {
      page: page,
      limit: limit,
      oldest: oldestFirst,
    }),
    {
      method: "POST",
    }
  );
};

export {
  authorization,
  authenticate,
  create_note,
  create_profile,
  deauthenticate,
  delete_note,
  get_notes,
  get_users,
  search_profile,
  update_note,
  update_profile,
};
