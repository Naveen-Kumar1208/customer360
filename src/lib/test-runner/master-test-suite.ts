import { FunctionalTestSuite } from '../test-cases/functional-tests';
import { WebhookTestSuite } from '../test-cases/webhook-tests';
import { SecurityTestSuite } from '../test-cases/security-tests';
import { AnalyticsTestSuite } from '../test-cases/analytics-tests';

export interface TestSuiteResult {
  suiteName: string;
  summary: {
    total: number;
    passed: number;
    failed: number;
    passRate: number;
  };
  results: Array<{
    testName: string;
    passed: boolean;
    error?: string;
    timestamp: string;
  }>;
  duration: number;
}

export interface MasterTestReport {
  runId: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  overallSummary: {
    totalTests: number;
    totalPassed: number;
    totalFailed: number;
    overallPassRate: number;
    suiteCount: number;
  };
  suiteResults: TestSuiteResult[];
  recommendations: string[];
}

export class MasterTestSuite {
  private runId: string;
  private startTime: Date;
  private suiteResults: TestSuiteResult[] = [];
  
  constructor() {
    this.runId = 'test_run_' + Date.now();
    this.startTime = new Date();
  }
  
  async runAllTests(options: {
    includeFunctional?: boolean;
    includeWebhook?: boolean;
    includeSecurity?: boolean;
    includeAnalytics?: boolean;
    verbose?: boolean;
  } = {}): Promise<MasterTestReport> {
    const {
      includeFunctional = true,
      includeWebhook = true,
      includeSecurity = true,
      includeAnalytics = true,
      verbose = false
    } = options;
    
    console.log('🚀 Starting WhatsApp Campaign Test Suite');
    console.log(`Run ID: ${this.runId}`);
    console.log(`Start Time: ${this.startTime.toISOString()}`);
    console.log('=====================================');
    
    // Run Functional Tests
    if (includeFunctional) {
      await this.runSuite('Functional Tests', async () => {
        const suite = new FunctionalTestSuite();
        const startTime = Date.now();
        await suite.runAllTests();
        const duration = Date.now() - startTime;
        
        return {
          summary: suite.getSummary(),
          results: suite.getResults(),
          duration
        };
      }, verbose);
    }
    
    // Run Webhook Tests
    if (includeWebhook) {
      await this.runSuite('Webhook Tests', async () => {
        const suite = new WebhookTestSuite();
        const startTime = Date.now();
        await suite.runAllTests();
        const duration = Date.now() - startTime;
        
        return {
          summary: suite.getSummary(),
          results: suite.getResults(),
          duration
        };
      }, verbose);
    }
    
    // Run Security Tests
    if (includeSecurity) {
      await this.runSuite('Security Tests', async () => {
        const suite = new SecurityTestSuite();
        const startTime = Date.now();
        await suite.runAllTests();
        const duration = Date.now() - startTime;
        
        return {
          summary: suite.getSummary(),
          results: suite.getResults(),
          duration
        };
      }, verbose);
    }
    
    // Run Analytics Tests
    if (includeAnalytics) {
      await this.runSuite('Analytics Tests', async () => {
        const suite = new AnalyticsTestSuite();
        const startTime = Date.now();
        await suite.runAllTests();
        const duration = Date.now() - startTime;
        
        return {
          summary: suite.getSummary(),
          results: suite.getResults(),
          duration
        };
      }, verbose);
    }
    
    const endTime = new Date();
    const report = this.generateReport(endTime);
    
    console.log('=====================================');
    console.log('📊 FINAL TEST REPORT');
    console.log('=====================================');
    this.printReport(report);
    
    return report;
  }
  
  private async runSuite(
    suiteName: string, 
    suiteRunner: () => Promise<{ summary: any; results: any; duration: number }>,
    verbose: boolean = false
  ): Promise<void> {
    try {
      console.log(`\n🧪 Running ${suiteName}...`);
      
      const { summary, results, duration } = await suiteRunner();
      
      const suiteResult: TestSuiteResult = {
        suiteName,
        summary,
        results,
        duration
      };
      
      this.suiteResults.push(suiteResult);
      
      // Print suite summary
      console.log(`✅ ${suiteName} completed:`);
      console.log(`   Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);
      console.log(`   Pass Rate: ${summary.passRate}%, Duration: ${duration}ms`);
      
      if (verbose && summary.failed > 0) {
        console.log('   Failed tests:');
        results
          .filter((r: any) => !r.passed)
          .forEach((r: any) => {
            console.log(`   ❌ ${r.testName}: ${r.error || 'Unknown error'}`);
          });
      }
      
    } catch (error) {
      console.error(`❌ ${suiteName} failed to run:`, error);
      
      const errorResult: TestSuiteResult = {
        suiteName,
        summary: { total: 0, passed: 0, failed: 1, passRate: 0 },
        results: [{
          testName: `${suiteName} Suite Execution`,
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString()
        }],
        duration: 0
      };
      
      this.suiteResults.push(errorResult);
    }
  }
  
  private generateReport(endTime: Date): MasterTestReport {
    const totalDuration = endTime.getTime() - this.startTime.getTime();
    
    // Calculate overall summary
    const totalTests = this.suiteResults.reduce((sum, suite) => sum + suite.summary.total, 0);
    const totalPassed = this.suiteResults.reduce((sum, suite) => sum + suite.summary.passed, 0);
    const totalFailed = this.suiteResults.reduce((sum, suite) => sum + suite.summary.failed, 0);
    const overallPassRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
    
    // Generate recommendations based on results
    const recommendations = this.generateRecommendations();
    
    return {
      runId: this.runId,
      startTime: this.startTime.toISOString(),
      endTime: endTime.toISOString(),
      totalDuration,
      overallSummary: {
        totalTests,
        totalPassed,
        totalFailed,
        overallPassRate,
        suiteCount: this.suiteResults.length
      },
      suiteResults: this.suiteResults,
      recommendations
    };
  }
  
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    // Analyze each suite for specific recommendations
    for (const suite of this.suiteResults) {
      if (suite.summary.passRate < 70) {
        recommendations.push(
          `🚨 ${suite.suiteName} has low pass rate (${suite.summary.passRate}%). ` +
          `Review failed tests and address underlying issues.`
        );
      }
      
      if (suite.suiteName === 'Security Tests' && suite.summary.failed > 0) {
        recommendations.push(
          '🔒 Security test failures detected. Prioritize fixing security issues before production deployment.'
        );
      }
      
      if (suite.suiteName === 'Webhook Tests' && suite.summary.failed > 0) {
        recommendations.push(
          '📨 Webhook test failures may impact delivery tracking. Verify webhook endpoint configuration.'
        );
      }
      
      if (suite.suiteName === 'Analytics Tests' && suite.summary.failed > 0) {
        recommendations.push(
          '📊 Analytics test failures may result in incorrect reporting. Validate calculation logic.'
        );
      }
    }
    
    // Overall recommendations
    const overallPassRate = this.suiteResults.reduce((sum, s) => sum + s.summary.passRate, 0) / this.suiteResults.length;
    
    if (overallPassRate >= 95) {
      recommendations.push('✅ Excellent test coverage! System is ready for production.');
    } else if (overallPassRate >= 85) {
      recommendations.push('✅ Good test results. Address minor issues before production deployment.');
    } else if (overallPassRate >= 70) {
      recommendations.push('⚠️ Moderate test results. Several issues need attention before deployment.');
    } else {
      recommendations.push('🚨 Poor test results. Significant issues must be resolved before deployment.');
    }
    
    // Performance recommendations
    const avgDuration = this.suiteResults.reduce((sum, s) => sum + s.duration, 0) / this.suiteResults.length;
    if (avgDuration > 10000) { // 10 seconds
      recommendations.push('⏱️ Tests are running slowly. Consider optimizing test execution or mocking external dependencies.');
    }
    
    return recommendations;
  }
  
  private printReport(report: MasterTestReport): void {
    console.log(`Run ID: ${report.runId}`);
    console.log(`Duration: ${(report.totalDuration / 1000).toFixed(2)}s`);
    console.log('');
    
    console.log('📈 OVERALL SUMMARY:');
    console.log(`Total Tests: ${report.overallSummary.totalTests}`);
    console.log(`Passed: ${report.overallSummary.totalPassed}`);
    console.log(`Failed: ${report.overallSummary.totalFailed}`);
    console.log(`Pass Rate: ${report.overallSummary.overallPassRate}%`);
    console.log(`Test Suites: ${report.overallSummary.suiteCount}`);
    console.log('');
    
    console.log('📋 SUITE BREAKDOWN:');
    report.suiteResults.forEach(suite => {
      const status = suite.summary.passRate === 100 ? '✅' : suite.summary.passRate >= 70 ? '⚠️' : '❌';
      console.log(`${status} ${suite.suiteName}: ${suite.summary.passed}/${suite.summary.total} (${suite.summary.passRate}%)`);
    });
    console.log('');
    
    if (report.recommendations.length > 0) {
      console.log('💡 RECOMMENDATIONS:');
      report.recommendations.forEach(rec => {
        console.log(`   ${rec}`);
      });
      console.log('');
    }
    
    // Show detailed failures if any
    const failedTests = report.suiteResults
      .flatMap(suite => suite.results.filter(r => !r.passed).map(r => ({ suite: suite.suiteName, ...r })));
    
    if (failedTests.length > 0) {
      console.log('❌ FAILED TESTS DETAIL:');
      failedTests.forEach(test => {
        console.log(`   [${test.suite}] ${test.testName}`);
        if (test.error) {
          console.log(`      Error: ${test.error}`);
        }
      });
    }
  }
  
  // Utility methods for exporting results
  public exportReportJSON(report: MasterTestReport): string {
    return JSON.stringify(report, null, 2);
  }
  
  public exportReportCSV(report: MasterTestReport): string {
    const headers = ['Suite,Test Name,Status,Error,Duration'];
    const rows: string[] = [];
    
    for (const suite of report.suiteResults) {
      for (const result of suite.results) {
        rows.push([
          suite.suiteName,
          result.testName,
          result.passed ? 'PASSED' : 'FAILED',
          result.error || '',
          suite.duration.toString()
        ].map(field => `"${field.replace(/"/g, '""')}"`).join(','));
      }
    }
    
    return [headers, ...rows].join('\n');
  }
  
  // Quick test runners for specific scenarios
  public async runFunctionalTestsOnly(): Promise<MasterTestReport> {
    return this.runAllTests({
      includeFunctional: true,
      includeWebhook: false,
      includeSecurity: false,
      includeAnalytics: false
    });
  }
  
  public async runSecurityTestsOnly(): Promise<MasterTestReport> {
    return this.runAllTests({
      includeFunctional: false,
      includeWebhook: false,
      includeSecurity: true,
      includeAnalytics: false
    });
  }
  
  public async runCriticalTestsOnly(): Promise<MasterTestReport> {
    return this.runAllTests({
      includeFunctional: true,
      includeWebhook: false,
      includeSecurity: true,
      includeAnalytics: false
    });
  }
}