class response {
  async success(res, message, data) {
    res.status(200).json({
      variant: "success",
      message: message || "Мувофақият",
      innerData: data || null,
    });
  }
  async created(res, message, data) {
    res.status(201).json({
      variant: "success",
      message: message || "Яратилди",
      innerData: data || null,
    });
  }

  async error(res, message, data) {
    res.status(401).json({
      variant: "error",
      message: message || "Рухсатсиз",
      innerData: data || null,
    });
  }

  async warning(res, message, data) {
    res.status(400).json({
      variant: "warning",
      message: message || "Огоҳлантириш",
      innerData: data || null,
    });
  }

  async notFound(res, message, data) {
    res.status(404).json({
      variant: "warning",
      message: message || "Топилмади",
      innerData: data || null,
    });
  }

  async internal(res, message, data) {
    res.status(500).json({
      variant: "error",
      message: message || "Сервердаги ички хатолик",
      innerData: data || null,
    });
  }
}

module.exports = new response();
