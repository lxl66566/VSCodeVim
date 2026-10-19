# VSCodeVim fork

<h2 align="center"><img src="https://raw.githubusercontent.com/lxl66566/VscodeVim/master/images/icon.png" height="128"><br>VSCodeVim</h2>
<p align="center"><strong>VSCodeVim fork with bug fixes and Chinese optimization</strong></p>

这是一个 [VSCode/Vim](https://github.com/VSCodeVim/Vim) 的 fork，相较于原版有如下改进：

- 其集成的 EasyMotion 插件现在支持中文搜索（使用拼音首字母；代价是搜索不再支持忽略大小写）：[#7745](https://github.com/VSCodeVim/Vim/pull/7745)
- 修复中文输入法无法替换选区的 bug：[#3952](https://github.com/VSCodeVim/Vim/issues/3952)、[#10100](https://github.com/VSCodeVim/Vim/issues/10100)
- 修复多光标下输入多个字符时，只有一个光标能够正确输入的 bug：[#9868](https://github.com/VSCodeVim/Vim/pull/9868)
- 修复中文输入法下，标点瞬时上屏时被输入两次的 bug（如使用 Rime 时按一次 `` ` `` 出现两个）。注意，该 bug 与 [#9668](https://github.com/VSCodeVim/Vim/issues/9668)、[#9700](https://github.com/VSCodeVim/Vim/issues/9700) 并不相同，即使设置了 `"editor.editContext": false`（对应旧版 `editor.experimentalEditContextEnabled`）也无法解决！！

直接搜索 [vim2-lxl66566](https://marketplace.visualstudio.com/items?itemName=lxl66566.vim2-lxl66566)；或者从 [Release](https://github.com/lxl66566/VSCodeVim/releases) 下载 VSXI 安装即可。

更多使用方式请查看 [VSCode/Vim](https://github.com/VSCodeVim/Vim) 的 README.md。

For more infomation, please visit [VSCode/Vim](https://github.com/VSCodeVim/Vim).
