echo "### TEST npm & JavaScript ###"
rm -rf test && node index.js test
cd test
npm test
PORT=9876 timeout 3 npm run dev
cat package.json
cat README.md
cd ..