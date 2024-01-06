class response {
  async success(res, message, data) {
    res.status(200).json({
      status: "success",
      message: message || "success",
      innerData: data || null,
    });
  }
  async created(res, message, data) {
    res.status(201).json({
      status: "success",
      message: message || "created",
      innerData: data || null,
    });
  }

  async error(res, message, data) {
    res.status(400).json({
      status: "error",
      message: message || "error",
      innerData: data || null,
    });
  }

  async warning(res, message, data) {
    res.status(400).json({
      status: "warning",
      message: message || "warning",
      innerData: data || null,
    });
  }

  async notFound(res, message, data) {
    res.status(404).json({
      status: "warning",
      message: message || "not found",
      innerData: data || null,
    });
  }

  async internal(res, message, data) {
    res.status(500).json({
      status: "error",
      message: message || "internal server error",
      innerData: data || null,
    });
  }
}

module.exports = new response();
