package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println("hello how are you");
        System.out.println("how is eery one doing i think they are doing grreat ");
        System.out.println(" hello  wolrd is doing ogreat");
        Scanner sc=  new Scanner(System.in);
        System.out.println("enter the number");
        int n = sc.nextInt();
        int sum=0;
        for(int i=1;i<n; i++){
            sum= sum+i;

        }
        System.out.println(sum);
        
        

    }
}
