const add = (fst_argv, snd_agrv, callback) => {
  setTimeout(() => {
    const sum = fst_argv + snd_agrv;
    callback(sum);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum);
});
