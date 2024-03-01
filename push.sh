#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/githubpassphrase
git push
