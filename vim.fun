## neovide

### 删除

```shell
rm -rf ~/.config/nvim
rm -rf ~/.local/state/nvim
rm -rf ~/.local/share/nvim
```

## vim

- u : 撤销
- ctrl + r : 回退撤销

```planetxt
Move the cursor to the first line below marked.
To make the first line the same as the second , move the cursor on top of the first charactor AFTER where the next is to be inserted.

Press i and type in the necessary additions.

Press esc to exit insert mode.
As each error is fixed press <Esc> to return to Normal mode.
```

- ctrl + i go forward
- ctrl + o go back
- ctrl ]

- % : find a matching ),},]


- :s/old/new/g : replace当前行第一个old替换成new
- :s/od/ne/g   : 当前行所有old替换成new

- 组合技 使用/或者?搜索输入数字+n/N

- :!+command可以直接执行命令
