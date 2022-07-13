#include<bits/stdc++.h>
#include<iostream>
#include<math.h>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
	int flag=0;
	
	if(p.size()==1 && p=="*"){
		return true;
	}
	if(s.size()!=p.size()){
		return false;
	}
	for(int i=0;i<s.size();i++){
		if(s[i]!=p[i] && s[i]!='?'){
			return false;
		}
	}
     }
};
int main(){

	 
}