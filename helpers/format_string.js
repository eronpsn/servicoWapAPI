const formatString=(format, ...args) =>{
    return format.replace(/{(\d+)}/g, (match, index) => {
      const argIndex = parseInt(index, 10);
      if (argIndex < args.length) {
        return args[argIndex];
      }
      return match; // Se o índice estiver fora dos limites, mantenha o marcador de posição.
    });
  }

  module.exports = {
    formatString
}