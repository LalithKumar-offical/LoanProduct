// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

    Console.WriteLine("This is a loan trial program."); 
Console.WriteLine("Please enter the loan amount:");
decimal loanAmount = Convert.ToDecimal(Console.ReadLine());
Console.WriteLine("Please enter the interest rate (as a percentage):");
decimal interestRate = Convert.ToDecimal(Console.ReadLine());
Console.WriteLine("Please enter the number of years for the loan:");
int years = Convert.ToInt32(Console.ReadLine());
decimal monthlyRate = interestRate / 100 / 12;
int months = years * 12;
decimal monthlyPayment = (loanAmount * monthlyRate) / (1 - (decimal)Math.Pow((double)(1 + monthlyRate), -months));
Console.WriteLine($"Your monthly payment is: {monthlyPayment:C2}");
Console.WriteLine("Press any key to exit.");
Console.ReadKey();

