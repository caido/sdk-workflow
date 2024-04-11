FILE=./src/typing.d.ts

rewrite:
	@sed -i.bak -E '/export/!s/(declare (type|class|enum|interface))/export \1/g' $(FILE)
	@rm $(FILE).bak
